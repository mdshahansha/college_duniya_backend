import mongoose from 'mongoose';
 
const counselorSchema = new mongoose.Schema({ 
    Name:String,
    Category:{
        enum:['financial','tech','life Moral']
    },
    profileImage:String,
    experince:Number,
    candidate:[{
       user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        _id:false
        },
        name:String,
        email:String,
        _id:false
}],
rating:[{
    rate:Number,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        _id:false 
    },
    _id:false 

}]
})
 
const Counselor = mongoose.model('Counselor', counselorSchema);
 
export default Counselor;

 