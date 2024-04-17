import mongoose from 'mongoose';


const otpSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true
    },
    fullName:
    {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    course:{
        type:String,
        require:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600 // OTP expires in 10 minutes
    }
});

const OTP = mongoose.model('OTP', otpSchema);

// module.exports = OTP;
export default OTP
