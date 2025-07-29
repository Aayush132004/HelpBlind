const mongoose =require("mongoose"); 

const scribeSchema = new mongoose.Schema({
  aadhaarNumber: {
    type: String,
    required: [true, 'Aadhaar number is required.'],
    unique: true, 
    match: [/^\d{12}$/, 'Please enter a valid 12-digit Aadhaar number.']
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required.'],
    trim: true,
  },
  age: {
  type: Number,
  required: [true, 'Age is required.'],
  min: [10, 'Minimum age be 5 years.'],
  max: [99, 'Maximum age is 99 years'],
},
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required.'],
    unique:true,
     trim: true,
     match: [/^\d{10}$/, 'Please enter a valid 10-digit mobile number.']
  },
  email: {
    type: String,
    default: '',
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.']
  },
  state: {
    type: String,
    required: [true, 'State is required.'],
  },
  city: {
    type: String,
    required: [true, 'City is required.'],
  },
  highestQualification: {
    type: String,
    required: [true, 'Highest qualification is required.'],
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
  },
  qualificationImgLink: {
   url: {type: String,
    },

   cloudinaryPublicId:{
            type:String,
        }
  },
  profile: {
    url:{
            type:String,
           
        },
        cloudinaryPublicId:{
            type:String,
        }
  },
  aadhaarCard: {
    url:{
    type: String,
  },
  
        cloudinaryPublicId:{
            type:String,
        }

},
role:{
  type:String,
  default:"scribe"
}
}, { timestamps: true });

const Scribe = mongoose.model('Scribe', scribeSchema);

module.exports = Scribe;
