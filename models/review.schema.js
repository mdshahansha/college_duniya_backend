import mongoose from 'mongoose';

const reviewSchema=new mongoose.Schema({
    college:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'college'
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    article:String,
    rating:Number
})


// Create College model
const Review = mongoose.model('Review', reviewSchema);

export default Review;
