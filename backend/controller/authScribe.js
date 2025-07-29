const Scribe = require("../src/models/scribe"); // Adjust path if needed
const Student=require("../src/models/student")
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt'); // Don't forget to install: npm install bcrypt
const jwt = require('jsonwebtoken'); // Don't forget to install: npm install jsonwebtoken

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// --- Controller 1: Generate Upload Signature ---
const uploadSignature = async (req, res) => {
    try {
        const tempUploadId = uuidv4();
        const timestamp = Math.round(new Date().getTime() / 1000);

        // Get file type from query param (e.g., /uploadSignature?fileType=profile)
        const fileType = req.query.fileType || 'misc'; 

        // Construct the base public_id. This will now include the intended folder path.
        // We will make sure this *exact* string is used in frontend FormData.
        let folderPrefix;
        let resource_type = 'image'; // Default for images

        if (fileType === 'profile') {
            folderPrefix = 'blindHelper/temp_profiles';
        } else if (fileType === 'qualification') {
            folderPrefix = 'blindHelper/temp_qualifications';
            // If qualification is PDF, uncomment next line:
            // resource_type = 'raw';
        } else if (fileType === 'aadhaar') {
            folderPrefix = 'blindHelper/temp_aadhaar';
        } else {
            folderPrefix = 'blindHelper/temp_misc';
        }
        
        // This public_id will now contain the full path including the temporary folder.
        // Cloudinary will infer the folder from this public_id.
        const public_id = `${folderPrefix}/${tempUploadId}_${timestamp}`; 

        // IMPORTANT CHANGE HERE:
        // Only include parameters in uploadParams that are absolutely necessary for signing
        // AND that will match the parameters sent directly in the frontend's FormData.
        // Cloudinary's error implies it only saw public_id and timestamp as signed.
        const uploadParams = {
            timestamp: timestamp,
            public_id: public_id, // Use the full public_id in signing
            // DO NOT include 'folder' or 'resource_type' here if they are not part of the signed string Cloudinary expects.
            // If you wanted to sign 'folder', it would need to be passed in uploadParams here.
            // But based on your error, it's NOT expected to be signed for this request.
        };

        const signature = cloudinary.utils.api_sign_request(
            uploadParams,
            process.env.CLOUDINARY_API_SECRET
        );

        res.status(200).json({
            signature,
            timestamp,
            public_id, // Send this full, signed public_id
            api_key: process.env.CLOUDINARY_API_KEY,
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            // Ensure the upload URL matches the resource type
            upload_url: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/${resource_type}/upload`
        });
    } catch (err) {
        console.error('Error generating upload signature:', err);
        res.status(500).json({ error: 'Failed to generate upload credential' });
    }
};

// --- Controller 2: Register User and Rename Cloudinary Assets ---
const registerScribe = async (req, res) => {
    try {
        const {
            aadhaarNumber,
            fullName,
            age,
            mobileNumber,
            email,
            state,
            city,
            highestQualification,
            password,
            profile, // Contains { url: tempUrl, cloudinaryPublicId: tempPublicId }
            aadhaarCard,
            qualificationImgLink
        } = req.body;

        // --- Backend Validation (Crucial for security and data integrity) ---
        // This should mirror your Zod schema for full protection.
        if (!fullName || fullName.trim().length === 0) {
            return res.status(400).json({ message: "Full name is required." });
        }
        if (!aadhaarNumber || !/^\d{12}$/.test(aadhaarNumber)) {
            return res.status(400).json({ message: "Valid 12-digit Aadhaar number is required." });
        }
        if (!age || age < 10 || age > 99) {
            return res.status(400).json({ message: "Age must be between 10 and 99 years." });
        }
        if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
            return res.status(400).json({ message: "Valid 10-digit mobile number is required." });
        }
        if (email && !/^\S+@\S+\.\S+$/.test(email)) { // Email is optional, but if present, must be valid
            return res.status(400).json({ message: "Please enter a valid email address." });
        }
        if (!state || state.trim().length === 0) {
            return res.status(400).json({ message: "State is required." });
        }
        if (!city || city.trim().length === 0) {
            return res.status(400).json({ message: "City is required." });
        }
        if (!highestQualification || highestQualification.trim().length === 0) {
            return res.status(400).json({ message: "Highest qualification is required." });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." });
        }
        // No need to validate confirmPassword here, frontend handles it.

        // Check for existing user by unique fields from your schema
        const existingUserMobile = await Scribe.findOne({ mobileNumber });
        if (existingUserMobile) {
            return res.status(409).json({ message: "User with this mobile number is already registered." });
        }
        const existingUserAadhaar = await Scribe.findOne({ aadhaarNumber }); // Assuming Aadhaar is unique
        if (existingUserAadhaar) {
            return res.status(409).json({ message: "User with this Aadhaar number is already registered." });
        }
        if (email && email.trim().length > 0) {
            const existingUserEmail = await Scribe.findOne({ email });
            if (existingUserEmail) {
                return res.status(409).json({ message: "User with this email is already registered." });
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user first. Initially, image URLs/publicIds can be placeholders.
        const newScribe = await Scribe.create({
            aadhaarNumber,
            fullName,
            age,
            mobileNumber,
            email: email || '', // Save as empty string if not provided
            state,
            city,
            highestQualification,
            password: hashedPassword,
            profile: { url: '', cloudinaryPublicId: '' }, // Placeholder
            aadhaarCard: { url: '', cloudinaryPublicId: '' }, // Placeholder
            qualificationImgLink: { url: '', cloudinaryPublicId: '' }, // Placeholder
        });

        const actualUserId = newScribe._id.toString(); // Get the new user's actual ID

        // --- Cloudinary Asset Renaming ---
        // This function renames the temporary asset to its permanent user-specific location
        const renameAsset = async (tempPublicId, destinationFolder) => {
            try {
                // Extract original filename part from the tempPublicId
                // e.g., 'blindHelper/temp_profiles/temp_asset_uuid_timestamp' -> 'temp_asset_uuid_timestamp'
                const originalFilenamePart = tempPublicId.split('/').pop();
                
                // Construct the new permanent public ID
                const newPublicId = `${destinationFolder}/${actualUserId}/${originalFilenamePart}`;
                
                const result = await cloudinary.uploader.rename(tempPublicId, newPublicId, {
                    overwrite: true // Overwrite if an asset with the newPublicId already exists (unlikely during new registration)
                });
                return {
                    url: result.secure_url,
                    cloudinaryPublicId: result.public_id,
                };
            } catch (renameErr) {
                console.error(`Error renaming Cloudinary asset ${tempPublicId}:`, renameErr.message, renameErr.http_code);
                // CRITICAL: Handle this failure appropriately.
                // Options:
                // 1. Delete the newly created Scribe user in MongoDB.
                // 2. Mark the user as "registration incomplete" or "document verification pending".
                // 3. Keep the temporary Cloudinary assets and retry renaming later (requires cleanup logic).
                // For this example, we re-throw, which will cause the entire registration to fail.
                throw new Error(`Failed to finalize document upload. Please try again. (Asset: ${tempPublicId})`);
            }
        };

        // Rename and get final secure URLs and public IDs for all assets
        const finalProfile = await renameAsset(profile.cloudinaryPublicId, `blindHelper/profiles`);
        const finalAadhaarCard = await renameAsset(aadhaarCard.cloudinaryPublicId, `blindHelper/aadhaar_cards`);
        const finalQualificationImgLink = await renameAsset(qualificationImgLink.cloudinaryPublicId, `blindHelper/qualification_certs`);

        // Update the newly created user document with the final Cloudinary URLs
        newScribe.profile = finalProfile;
        newScribe.aadhaarCard = finalAadhaarCard;
        newScribe.qualificationImgLink = finalQualificationImgLink;
        await newScribe.save(); // Save the user with the updated image links

        // Generate JWT token
        const token = jwt.sign(
            { id: newScribe._id, email: newScribe.email, mobileNumber: newScribe.mobileNumber },
            process.env.JWT_KEY,
            { expiresIn: '2h' } // 2 hours expiry
        );

        // Set cookie
        res.cookie('token', token, {
            maxAge: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
            httpOnly: true, // Prevent client-side JS access
            secure: true, // Send only over HTTPS in production
            sameSite: 'None', // Important for cross-origin frontend/backend deployments
        });

        const reply = {
            _id: newScribe._id,
            fullName: newScribe.fullName,
            profile: newScribe.profile.url,
            state: newScribe.state,
            city: newScribe.city,
        };

        res.status(201).json({ // 201 Created is appropriate for registration
            user: reply,
            message: "Successfully Registered"
        });

    } catch (e) {
        console.error("Registration error:", e);
        let errorMessage = "Registration failed due to an unexpected error.";
        let statusCode = 500;

        // Specific error messages for duplicate keys (Mongoose)
        if (e.code === 11000 && e.keyPattern) {
            if (e.keyPattern.mobileNumber) {
                errorMessage = "Mobile number is already registered.";
                statusCode = 409;
            } else if (e.keyPattern.email) {
                errorMessage = "Email is already registered.";
                statusCode = 409;
            } else if (e.keyPattern.aadhaarNumber) {
                errorMessage = "Aadhaar number is already registered.";
                statusCode = 409;
            }
        } else if (e.message) {
            // Catch custom errors thrown (e.g., from renameAsset or initial validation)
            errorMessage = e.message;
            statusCode = 400; // Client-side error likely
            if (e.message.includes('Failed to finalize upload')) { // From renameAsset failure
                statusCode = 500;
            }
        }

        res.status(statusCode).json({ message: errorMessage });
    }
};

const registerStudent = async (req, res) => {
    try {
        const {
            aadhaarNumber,
            fullName,
            age,
            mobileNumber,
            email,
            state,
            city,
            educationLevel,
            disability,
            password,
            profile, // Contains { url: tempUrl, cloudinaryPublicId: tempPublicId }
            aadhaarCard,
        } = req.body;
        // console.log(req.body);

        // --- Backend Validation (Crucial for security and data integrity) ---
        // This should mirror your Zod schema for full protection.
        if (!fullName || fullName.trim().length === 0) {
            return res.status(400).json({ message: "Full name is required." });
        }
        if (!aadhaarNumber || !/^\d{12}$/.test(aadhaarNumber)) {
            return res.status(400).json({ message: "Valid 12-digit Aadhaar number is required." });
        }
        if (!age || age < 10 || age > 99) {
            return res.status(400).json({ message: "Age must be between 10 and 99 years." });
        }
        if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
            return res.status(400).json({ message: "Valid 10-digit mobile number is required." });
        }
        if (email && !/^\S+@\S+\.\S+$/.test(email)) { // Email is optional, but if present, must be valid
            return res.status(400).json({ message: "Please enter a valid email address." });
        }
        if (!state || state.trim().length === 0) {
            return res.status(400).json({ message: "State is required." });
        }
        if (!city || city.trim().length === 0) {
            return res.status(400).json({ message: "City is required." });
        }
        if (!disability|| disability.trim().length === 0) {
            return res.status(400).json({ message: "Type Of Disability is required." });
        }
        if (!password || password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters." });
        }
        // No need to validate confirmPassword here, frontend handles it.

        // Check for existing user by unique fields from your schema
        const existingUserMobile = await Student.findOne({ mobileNumber });
        if (existingUserMobile) {
            return res.status(409).json({ message: "User with this mobile number is already registered." });
        }
        const existingUserAadhaar = await Student.findOne({ aadhaarNumber }); // Assuming Aadhaar is unique
        if (existingUserAadhaar) {
            return res.status(409).json({ message: "User with this Aadhaar number is already registered." });
        }
        if (email && email.trim().length > 0) {
            const existingUserEmail = await Student.findOne({ email });
            if (existingUserEmail) {
                return res.status(409).json({ message: "User with this email is already registered." });
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user first. Initially, image URLs/publicIds can be placeholders.
        const newStudent = await Student.create({
            aadhaarNumber,
            fullName,
            age,
            mobileNumber,
            email: email || '', // Save as empty string if not provided
            state,
            city,
            disability,
            educationLevel,
            password: hashedPassword,
            profile: { url: '', cloudinaryPublicId: '' }, // Placeholder
            aadhaarCard: { url: '', cloudinaryPublicId: '' }, // Placeholder
           
        });

        const actualUserId = newStudent._id.toString(); // Get the new user's actual ID

        // --- Cloudinary Asset Renaming ---
        // This function renames the temporary asset to its permanent user-specific location
        const renameAsset = async (tempPublicId, destinationFolder) => {
            try {
                // Extract original filename part from the tempPublicId
                // e.g., 'blindHelper/temp_profiles/temp_asset_uuid_timestamp' -> 'temp_asset_uuid_timestamp'
                const originalFilenamePart = tempPublicId.split('/').pop();
                
                // Construct the new permanent public ID
                const newPublicId = `${destinationFolder}/${actualUserId}/${originalFilenamePart}`;
                
                const result = await cloudinary.uploader.rename(tempPublicId, newPublicId, {
                    overwrite: true // Overwrite if an asset with the newPublicId already exists (unlikely during new registration)
                });
                return {
                    url: result.secure_url,
                    cloudinaryPublicId: result.public_id,
                };
            } catch (renameErr) {
                console.error(`Error renaming Cloudinary asset ${tempPublicId}:`, renameErr.message, renameErr.http_code);
                // CRITICAL: Handle this failure appropriately.
                // Options:
                // 1. Delete the newly created Scribe user in MongoDB.
                // 2. Mark the user as "registration incomplete" or "document verification pending".
                // 3. Keep the temporary Cloudinary assets and retry renaming later (requires cleanup logic).
                // For this example, we re-throw, which will cause the entire registration to fail.
                throw new Error(`Failed to finalize document upload. Please try again. (Asset: ${tempPublicId})`);
            }
        };

        // Rename and get final secure URLs and public IDs for all assets
        const finalProfile = await renameAsset(profile.cloudinaryPublicId, `blindHelper/profiles`);
        const finalAadhaarCard = await renameAsset(aadhaarCard.cloudinaryPublicId, `blindHelper/aadhaar_cards`);

        // Update the newly created user document with the final Cloudinary URLs
        newStudent.profile = finalProfile;
        newStudent.adhaarCard = finalAadhaarCard;
       
        await newStudent.save(); // Save the user with the updated image links

        // Generate JWT token
        const token = jwt.sign(
            { id: newStudent._id, email: newStudent.email, mobileNumber: newStudent.mobileNumber },
            process.env.JWT_KEY,
            { expiresIn: '2h' } // 2 hours expiry
        );

        // Set cookie
        res.cookie('token', token, {
            maxAge: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
            httpOnly: true, // Prevent client-side JS access
            secure: true, // Send only over HTTPS in production
            sameSite: 'None' 
        });

        const reply = {
            _id: newStudent._id,
            fullName: newStudent.fullName,
            profile: newStudent.profile.url,
            state: newStudent.state,
            city: newStudent.city,
        };

        res.status(201).json({ // 201 Created is appropriate for registration
            user: reply,
            message: "Successfully Registered"
        });

    } catch (e) {
        console.error("Registration error:", e);
        let errorMessage = "Registration failed due to an unexpected error.";
        let statusCode = 500;

        // Specific error messages for duplicate keys (Mongoose)
        if (e.code === 11000 && e.keyPattern) {
            if (e.keyPattern.mobileNumber) {
                errorMessage = "Mobile number is already registered.";
                statusCode = 409;
            } else if (e.keyPattern.email) {
                errorMessage = "Email is already registered.";
                statusCode = 409;
            } else if (e.keyPattern.aadhaarNumber) {
                errorMessage = "Aadhaar number is already registered.";
                statusCode = 409;
            }
        } else if (e.message) {
            // Catch custom errors thrown (e.g., from renameAsset or initial validation)
            errorMessage = e.message;
            statusCode = 400; // Client-side error likely
            if (e.message.includes('Failed to finalize upload')) { // From renameAsset failure
                statusCode = 500;
            }
        }

        res.status(statusCode).json({ message: errorMessage });
    }
};

// --- Login Controllers ---
const login = async (req, res) => {
    
    try {
         let user;
        // console.log("body",req.body)
        const { mobileNumber,email, password,loginType,loginAs } = req.body;


        if(loginType==="email"){
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required." });
        }
        if(loginAs==="scribe")
         user = await Scribe.findOne({ email:email }) // Corrected from emailId
        else
         user=await Student.findOne({email:email})
      
       
    }
    else{ 
         if(!mobileNumber || !password) 
            return res.status(400).json({ message: "Mobile Number and password are required." });
          if(loginAs==="scribe")
          user = await Scribe.findOne({ mobileNumber:mobileNumber }) // Corrected from emailId
          else 
              user=await Student.findOne({mobileNumber:mobileNumber})

            
    }
     if (!user) {
        // console.log("no user");
            return res.status(404).json({ message: "User not found." });
        }

        // console.log("user is ",user)
        

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(401).json({ message: "Invalid credentials." });
        }
        // console.log("match",match);

        const token = jwt.sign(
            { id: user._id, email: user.email, mobileNumber: user.mobileNumber },
            process.env.JWT_KEY,
            { expiresIn: '2h' }
        );

        res.cookie('token', token, {
            maxAge: 2 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true,
          sameSite: 'None' 

        });

        const reply = {
            _id: user._id,
            fullName: user.fullName,
            profile: user.profile ? user.profile.url : null,
            state: user.state,
            city: user.city,
        }

        res.status(200).json({ // 200 OK for successful login
            user: reply,
            message: "Login successful"
        });
    } catch (e) {
        console.error("Login error", e);
        res.status(500).json({ message: e.message || "Login failed due to an unexpected error." });
    }
};



const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
          sameSite: 'None' 
        });
        res.status(200).send("Logged Out Successfully");
    } catch (err) {
        console.error("Logout error:", err);
        res.status(500).send("Error logging out: " + err.message);
    }
};

module.exports = { registerScribe, uploadSignature, login, logout,registerStudent };