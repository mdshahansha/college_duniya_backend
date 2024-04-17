import mongoose from 'mongoose';

const paymentSchema=new mongoose.Schema({
    college:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'college'
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    courses:String,
    amount:Number,
    personalDetails:{
        title:String,//mr/miss
        firstName:String,
        middleName:String,
        lastName:String,
        gender:String,
        socialCategory:String,
        nationality:String,
        dob:Date,
        mobileNumber:Number,
        alternateMobileNumber:Number,
        email:String,
        _id: false

    },
    academicDetailAndDocument: {
        classX: {
            board: { type: String },
            school: { type: String },
            passingYear: { type: Number },
            markType: { type: String },
            percentageOrCGPA: { type: Number }
        },
        classXII: {
            board: { type: String },
            passingYear: { type: Number },
            stream: { type: String },
            markType: { type: String },
            percentageOrCGPA: { type: Number }
        },
        graduation: {
            college: { type: String },
            passingYear: { type: Number },
            degree: { type: String },
            markType: { type: String },
            percentage: { type: Number }
        },
        documents: {
            classX: String,
            classXII: String,
            jeeMainRankCard: String,
            graduation: String,
            addharCard:String,
            photo:String,
            
    
        },
        _id: false

    },
    decleration:{
        type:Boolean,
        default:false
    },
    applicationNumber:String,
    dateOfReceipt:String,
    onlineTrasactionOrderID:String,//store orderId
    transactionId:String,//razorpay_payment_id
    amountRecived:Number,
    paymentSignature:String//razorpay_signature
})


// Create College model
const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;

// * presnol details and academic details will saved or update from ref of user.schema 