import { mongoose } from "mongoose"; 

const RequestCallSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    contactDetails: {
        name: { type: String },
        email: { type: String },
        mobileNumber: { type: String }
    }
})

const RequestCall=mongoose.model('RequestCall',RequestCallSchema);

export default RequestCall;


