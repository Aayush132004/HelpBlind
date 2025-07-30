const mongoose =require("mongoose"); 
const {Schema} = mongoose;

const studentSchema = new mongoose.Schema({
  aadhaarNumber: {
    type: String,
    required: [true, 'Aadhaar number is required.'],
    unique: true, 
    trim: true,
    match: [/^\d{12}$/, 'Please enter a valid 12-digit Aadhaar number.']
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required.'],
    trim: true,
  },
  mobileNumber: {
    type: String,
    required: [true, 'Mobile number is required.'],
    unique: true, 
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
 age: {
  type: Number,
  required: [true, 'Age is required.'],
  min: [5, 'Minimum age be 5 years.'],
  max: [99, 'Maximum age is 99 years'],
},

  state: {
    type: String,
    required: [true, 'State is required.'],
    trim: true,
  },
  city: {
    type: String,
    required: [true, 'City is required.'],
    trim: true,
  },
 
  educationLevel: {
    type: String,
    required: [true, 'Education level is required.'],
    enum: ['High School', 'Undergraduate', 'Graduate', 'Postgraduate', 'Other'], 
    trim: true,
  },
  disability: {
    type: String,
    default: 'None', 
    trim: true,
  },
   profile: {
    url:{
            type:String,
           
        },
        cloudinaryPublicId:{
            type:String,
        }
  },
  adhaarCard:{
    url:{
            type:String,
           
        },
        cloudinaryPublicId:{
            type:String,
        }
  },
  role:{
  type:String,
  default:"student"
},
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: [6, 'Password must be at least 6 characters long.'], 
  },
  permanentscibe : {
    type: Schema.Types.ObjectId,
    ref: 'Scribe' 
  }
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;