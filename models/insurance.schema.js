import mongoose from 'mongoose';


const insuranceSchema=new mongoose.Schema({
    // college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
    contactDetails: {
        name: { type: String },
        email: { type: String },
        mobileNumber: { type: String }
    }
})


const RequestCall=mongoose.model('Insurance',insuranceSchema);
export default RequestCall;