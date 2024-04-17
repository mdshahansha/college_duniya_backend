import ScheduleCall from '../models/scheduleCall.schema.js';
import ScheduleVisit from '../models/scheduleVisit.schema.js';
import User from '../models/user.schema.js';
import College from '../models/college.schema.js'
 
// Function to create a new schedule call
export const createScheduleCall = async (req,res) => {
    try {
        const {collegeId, userId}=req.params;
        console.log(collegeId," __ ",userId)
        // Find the user by user ID
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

        // Extract contact details from the user's information
    const { basicDetails: { fullName }, contactDetails: { email, mobileNumber } } = user;

        const contactDetails = {
            name: fullName,
            email,
            mobileNumber
        };

        // Check if the user has already scheduled a call for the same college
        const existingScheduleCall = await ScheduleCall.findOne({ college: collegeId, user: userId });
        if (existingScheduleCall) {
            throw new Error('User has already scheduled a call for this college');
        }

        // Create a new schedule call instance
        const scheduleCall = new ScheduleCall({
            college: collegeId,
            contactDetails: contactDetails,
            user: userId
        });

        // Save the schedule call
        await scheduleCall.save();
        res.status(201).json(scheduleCall);
    } catch (error) {
        console.error("Error creating schedule call:", error);
        throw error;
    }
}

// Function to create a new schedule visit
export const createScheduleVisit = async (req,res) => {
    try {

        const {collegeId, userId}=req.params;
        // Find the user by user ID
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }

          // Extract contact details from the user's information
    const { basicDetails: { fullName }, contactDetails: { email, mobileNumber } } = user;

    const contactDetails = {
        name: fullName,
        email,
        mobileNumber
    };

        // Check if the user has already scheduled a visit for the same college
        const existingScheduleVisit = await ScheduleVisit.findOne({ college: collegeId, user: userId });
        if (existingScheduleVisit) {
            throw new Error('User has already scheduled a visit for this college');
        }

        // Create a new schedule visit instance
        const scheduleVisit = new ScheduleVisit({
            college: collegeId,
            contactDetails: contactDetails,
            user: userId
        });

        // Save the schedule visit
        await scheduleVisit.save();
        // return scheduleVisit;
        res.status(201).json(scheduleVisit);

    } catch (error) {
        console.error("Error creating schedule visit:", error);
        throw error;
    }
}

// Function to get all schedule calls along with college name and user contact details
export const getScheduleCalls = async (req, res) => {
    try {
        const scheduleCalls = await ScheduleCall.aggregate([
            {
                $group: {
                    _id: "$college",
                    totalCalls: { $sum: 1 },
                    userContactDetails: { $push: "$contactDetails" }
                }
            },
            {
                $lookup: {
                    from: "colleges", // Assuming the collection name for colleges is "colleges"
                    localField: "_id",
                    foreignField: "_id",
                    as: "college"
                }
            },
            {
                $project: {
                    _id: 0,
                    collegeName: { $arrayElemAt: ["$college.name", 0] },
                    totalCalls: 1,
                    userContactDetails: 1
                }
            }
        ]);
        res.status(200).json(scheduleCalls);
    } catch (error) {
        console.error("Error getting schedule calls:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Function to get all schedule visits along with college name and user contact details
export const getScheduleVisits = async (req, res) => {
    try {
        const scheduleVisits = await ScheduleVisit.aggregate([
            {
                $group: {
                    _id: "$college",
                    totalVisits: { $sum: 1 },
                    userContactDetails: { $push: "$contactDetails" }
                }
            },
            {
                $lookup: {
                    from: "colleges", // Assuming the collection name for colleges is "colleges"
                    localField: "_id",
                    foreignField: "_id",
                    as: "college"
                }
            },
            {
                $project: {
                    _id: 0,
                    collegeName: { $arrayElemAt: ["$college.name", 0] },
                    totalVisits: 1,
                    userContactDetails: 1
                }
            }
        ]);
        res.status(200).json(scheduleVisits);
    } catch (error) {
        console.error("Error getting schedule visits:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
