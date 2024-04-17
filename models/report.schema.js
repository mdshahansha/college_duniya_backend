import mongoose from 'mongoose';
 
const reportSchema = new mongoose.Schema(
    {
        content:String,
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        name:String
    }
) 

const Report = mongoose.model('Report', reportSchema);

// module.exports = User;
export default Report;

 