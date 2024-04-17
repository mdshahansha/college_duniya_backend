import mongoose from 'mongoose';

// Define schema for scheduling a visit
const scheduleVisitSchema = new mongoose.Schema({
    college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
    contactDetails: {
        name: { type: String },
        email: { type: String },
        mobileNumber: { type: String }
    }
});
const ScheduleVisit = mongoose.model('ScheduleVisit', scheduleVisitSchema);

export default ScheduleVisit