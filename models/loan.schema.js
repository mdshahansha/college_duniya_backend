import mongoose from 'mongoose';

const { Schema } = mongoose;

const loanSchema = new Schema({
    bank: {
        type: String,
        required: true
    },
    interestRate: {
        type: Number,
        required: true
    },
    maxTenure: {
        type: Number,
        required: true
    },
    bankType: {
        type: String,
        required: true,
        enum: ["government", "private", "cooperative", "NBFC"]
    },
    scheme: {
        type: String,
        required: true
    },
    compare: {
        type: Boolean,
        default: false // Default value is false
    },
    userApplied:[{
        name:String,
        email:String,
        mobileNumber:Number,
        course:String,
        city:String,
        user:String,
        _id:false
    }]
});

const Loan = mongoose.model('Loan', loanSchema);

export default Loan;
