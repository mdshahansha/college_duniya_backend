import mongoose from 'mongoose';

// Define schema for user details
const userSchema = new mongoose.Schema({
    basicDetails: {
        fullName: { type: String, required: true },
        dob: { type: Date },
        socialCategory: { type: String },
        gender: { type: String },
        maritalStatus: { type: String },
        physicalChanges: { type: String }
    },
    password: {
        type: String
    },
    contactDetails: {
        mobileNumber:
        {
            type: String,
            require: true
        },
        email: {
            type: String,
            required: true
        },
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
    college: {
        recommendation: [{
            college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
            // scheduleACall: { type: Boolean, default: false },
            // scheduleACall:{type: mongoose.Schema.Types.ObjectId, ref: 'ScheduleCall'} 

        }],
        collegeShortlist: [
            {
                college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
                // scheduleACall:{type: mongoose.Schema.Types.ObjectId, ref: 'ScheduleCall'} ,
                // scheduleACall: { type: Boolean, default: false },

                // scheduleVisit:{type: mongoose.Schema.Types.ObjectId, ref: 'ScheduleVisit'} 
            }
        ],
        application: [{
            college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
            // scheduleACall: { type: Boolean, default: false }, 
            // scheduleACall:{type: mongoose.Schema.Types.ObjectId, ref: 'ScheduleVisit'} 

        }]

    },
    myfeed: [{
        college: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'College'
        },
        feed: String,
    }],
    documents: {
        classX: String,
        classXII: String,
        jeeMainRankCard: String,
        graduation: String,

    },
    myTest: Number,
});

// Create a model
const User = mongoose.model('User', userSchema);

// module.exports = User;
export default User;


/*
    {
    "basicDetails": {
        "fullName": "John Doe",
        "dob": "1990-05-15",
        "socialCategory": "General",
        "gender": "Male",
        "maritalStatus": "Single",
        "physicalChanges": "None"
    },
    "contactDetails": {
        "mobileNumber": "1234567890",
        "email": "johndoe@example.com",
        "city": "New York",
        "state": "NY"
    },
    "educationDetails": {
        "classX": {
            "board": "CBSE",
            "school": "XYZ Public School",
            "passingYear": 2008,
            "markType": "Percentage",
            "percentageOrCGPA": 85
        },
        "classXII": {
            "board": "CBSE",
            "passingYear": 2010,
            "stream": "Science",
            "markType": "Percentage",
            "percentageOrCGPA": 80
        },
        "graduation": {
            "college": "ABC College",
            "passingYear": 2014,
            "degree": "Bachelor of Engineering",
            "markType": "Percentage",
            "percentage": 75
        }
    },
    "examDetails": {
      type:string
    },
    "preferences": {
            "stream": "Engineering",
            "level": "Undergraduate",
            "specialization": "Computer Science",
            "location": "Any",
            "collegeType": "Private",
            "feeRange": "Medium",
            "college": "Any",
            "noPreferenceInStudyingAbroad": false,
            "needLoan": true
        }
}

*/