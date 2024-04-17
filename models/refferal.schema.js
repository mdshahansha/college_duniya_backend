import mongoose from 'mongoose';

const refferalSchema = new mongoose.Schema({
    basicDetails: {
        fullName: { type: String, required: true },
        dob: { type: Date },
        socialCategory: { type: String },
        gender: { type: String },
        maritalStatus: { type: String },
        physicalChanges: { type: String }
    },
    contactDetails: {
        mobileNumber: { type: String, require: true },
        email: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String }
    },
    educationDetails: {
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
        }
    },
    examDetails: {
        preferences: {
            stream: { type: String },
            level: { type: String },
            specialization: { type: String },
            location: { type: String },
            collegeType: { type: String },
            feeRange: { type: String },
            college: { type: String },
            noPreferenceInStudyingAbroad: { type: Boolean },
            needLoan: { type: Boolean }
        }
    },
    preferences: {
        selectCourse: String,
        chooseSpecialization: String,
        budget: Number,
        preferredCollege1: String,
        preferredCollege2: String,
        preferredCollege3: String,
    },
    refferedBy: {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        name: String
    }
});

// Pre-hook to populate the name field before saving
// refferalSchema.pre('save', async function(next) {
//     try {
//         if (this.isModified('refferedBy.userId')) {
//             const user = await mongoose.model('User').findById(this.refferedBy.userId);
//             this.refferedBy.name = user.fullName; // Assuming fullName is the field storing the user's name
//         }
//         next();
//     } catch (error) {
//         next(error);
//     }
// });

const Refferal = mongoose.model('Refferal', refferalSchema);

export default Refferal;
