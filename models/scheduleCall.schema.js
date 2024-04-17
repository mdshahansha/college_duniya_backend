import mongoose from 'mongoose';

// Define schema for scheduling a call
const scheduleCallSchema = new mongoose.Schema({
    college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
    contactDetails: {
        name: { type: String },
        email: { type: String },
        mobileNumber: { type: String }
    }
});


const ScheduleCall = mongoose.model('ScheduleCall', scheduleCallSchema);

export default ScheduleCall;