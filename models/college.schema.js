import mongoose from 'mongoose';


// Define schema for the college information
const collegeSchema = new mongoose.Schema({
    name:String,
    info: {
        lastUpdate: Date,
        quickFacts: String,
        highlights: [{
            data: {
                column1: String,
                column2: String,
            },
            _id: false // Prevent Mongoose from generating _id for each highlight

        }],
        ranking: [{
            nirf: String,
            publisher: String,
            stream: String,
            _id: false // Prevent Mongoose from generating _id for each highlight

        }],
        coursesAndFees: [
            {
                nirf: String,
                publisher: String,
                stream: String,
                _id: false // Prevent Mongoose from generating _id for each highlight

            }// Reference to the 'CourseAndFee' model
        ],
    },

    placements: {
        latestUpdate: String,
        tableOfContentPlacement: String,
        highlights: String,
        placementInfo: String,
        placementProcess: String,
        _id: false // Prevent Mongoose from generating _id for each highlight

    },
    coursesAndFees: {
        courseAndFee: [{
            course: String,
            avgfees: String,
            duration: String,
            _id: false // Prevent Mongoose from generating _id for each highlight

        }],
        courseAndFeeDetail: {
            type: String
        },
        courseAndFeesStructure: [{
            course: String,
            totalTutionFee: String,
            eligibility: String,
            _id: false // Prevent Mongoose from generating _id for each highlight

        }],
        entranceExamsAccepted: {
            type: String
        },
        feePaymentGuidlines: {
            type: String
        },
        allBranchTech: [{
            courses: String,
            viewDetailFee: String,
            _id: false // Prevent Mongoose from generating _id for each highlight

        }]
    },
    feeds:[{
        content:String,
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
    }],

    admission: [{
        title: String,
        updates: String,
        highlightsUniversity: [
            {
                various: String,
                typeof: String,
        _id: false // Prevent Mongoose from generating _id for each highlight

            }
        ],
        bcaEligibilityCriteria: String,
        bcaSelectionProcess: String,
        mcaEligibilityCriteria: String,
        mcaSelectionProcess: String,
        mscEligibilityCriteria: String,
        mscSelectionProcess: String,
        bscEligibilityCriteria: String,
        bscSelectionProcess: String,
        baEligibilityCriteria: String,
        baSelectionProcess: String,
        _id: false // Prevent Mongoose from generating _id for each highlight

    }],

    cutoff: {
        content: String,
        updates: String,
        tableOfContentCutOff: [String],
        cutOffArticle: String,
        managementcutOff: [{
            courses: String,
            cutOfPercentile: String
        }],
        _id: false // Prevent Mongoose from generating _id for each highlight

    },
    // reviews: [{
    //     userId: mongoose.Schema.Types.ObjectId,
    //     content: String,

    // }],
    reviews: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Reference to the 'User' model
        },
        content: String,
        _id: false // Prevent Mongoose from generating _id for each highlight

    }],
    infrastructure: {
        library: String,
        digitalLibrary: String,
        networkFacilities: String,
        ciscoNetworkingAcademy: String,
        hostels: String,
        sportsFacilities: String,
        guestHouse: String,
        canteen: String,
        amenitiesComplex: String,
        banksAtm: String,


    },
    gallery: [{
        infrastructureImageURL: String,
        uploadImageUrl: String,
        campusImageUrl: String,
        _id: false // Prevent Mongoose from generating _id for each highlight

    }],
    scholarship: {
        BtechScholarShip: String,
        BScScholarShip: String,

        MtechScholarShip: String,

        feeDetails: [{
            stream: String,
            fee: String,
            year: String,

        }],
        _id: false // Prevent Mongoose from generating _id for each highlight


    }, 
    schedule:[{
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        ScheduleCall:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'ScheduleCall'
        },
        ScheduleVisit:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'ScheduleVisit'
        },
        _id: false // Prevent Mongoose from generating _id for each highlight


    }],

    location: {
        city:String,
        state:String,
        _id: false // Prevent Mongoose from generating _id for each highlight

    },
    entranceCriteria: {
        entranceExam:[String],
        //     type:[String],
        //     // enum:["jeeMain","jeeAdvance","cuet"],
        //     message: '{VALUE} is not supported for this college entrance'
        // },
        year: [Number],
        rank: [Number],
        score: [Number],
        state: String,
        course: [String],
        reservationCategory:[String],
        _id: false // Prevent Mongoose from generating _id for each highlight

    },
    appliedUser:{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Reference to the 'User' model
        },
        name: String,
        email: String,
        mobileNumber: String,
        _id:false
    },
    collegeScholarShip:{
        // courses:[String],
        meritBasis:[String],
        collegeOffered:[String],
        incomeBased:[String],
        genderBased:[String],
        otherScholarship:[String],
        _id: false // Prevent Mongoose from generating _id for each highlight
    },
    commonApplication:{
        // courses:[String],
        stream:[String],
        level:[String],
        degreeType:[String],
        feeRange:[Number],
        _id: false // Prevent Mongoose from generating _id for each highlight
 },
    // courses:[{String}],
    courses: [
     String
      ]

});

// Create College model
const College = mongoose.model('College', collegeSchema);

export default College;
