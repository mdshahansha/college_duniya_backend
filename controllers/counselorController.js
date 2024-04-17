import User from '../models/user.schema.js'
import Counselor from '../models/conselor.schema.js'


export const createCounselor=async (req,res)=>{
    try {
        // Extract counselor details from the request body
        const { Name, Category, experince } = req.body;
        
        // Extract image file from the request
        const profileImage = req.files[0].path; // Assuming multer or similar middleware is used for file upload
        console.log("profileImage ",profileImage)

        // Create a new counselor document
        const counselor = new Counselor({
            Name,
            Category,
            profileImage, // Save the image URL to the counselor document
            experince
        });

        // Save the counselor document to the database
        await counselor.save();

        // Return success response
        res.status(201).json({ message: 'Counselor created successfully', counselor });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getCounselorAll=async (req,res)=>{
    try {
        // Extract page number and page size from request query parameters
        const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
        const pageSize = parseInt(req.query.pageSize) || 20; // Default page size to 20 if not specified

        // Calculate the number of documents to skip
        const skip = (page - 1) * pageSize;

        // Query counselors for the current page
        const counselors = await Counselor.find()
            .skip(skip)
            .limit(pageSize)
            .exec();

        // Count total number of counselors in the database
        const totalCounselors = await Counselor.countDocuments();

        // Calculate total number of pages
        const totalPages = Math.ceil(totalCounselors / pageSize);

        // Return the response with pagination information
        res.status(200).json({
            counselors,
            currentPage: page,
            pageSize,
            totalCounselors,
            totalPages
        });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const contactCounselor=async (req,res)=>{
    try {
        // Extract userId and counselorId from request parameters
        const { userId, counselorId } = req.params;

        // Find the user by userId
        const user = await User.findById(userId);

        // If user is not found, return an error
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Extract user's contact details
        const { basicDetails, contactDetails } = user;

        // If user's email or contact details are not available, return an error
        if (!basicDetails || !contactDetails) {
            return res.status(400).json({ error: 'User email or contact details not found' });
        }

        // Find the counselor by counselorId
        const counselor = await Counselor.findById(counselorId);

        // If counselor is not found, return an error
        if (!counselor) {
            return res.status(404).json({ error: 'Counselor not found' });
        }

        // Insert user's contact details into the counselor's candidate array
        counselor.candidate.push({
            user: user._id,
            name:  basicDetails.fullName, // Assuming user has basicDetails
            email: contactDetails.email,
            mobileNumber: contactDetails.mobileNumber // Assuming contactDetails includes mobileNumber
        });
        console.log('counselor   ',counselor);

        // Save the updated counselor document
        await counselor.save();

        // Return success response
        res.status(200).json({ message: 'Contact details added successfully' });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


export const createRating = async (req, res) => {
    try {
        // const { counselorId } = r/eq.params;
        const { userId,counselorId, rate } = req.body;

        // Find the counselor by ID
        const counselor = await Counselor.findById(counselorId);

        // If counselor not found, return an error
        if (!counselor) {
            return res.status(404).json({ error: 'Counselor not found' });
        }

        // Add the rating to the counselor's ratings array
        counselor.rating.push({ rate, user: userId });

        // Save the updated counselor document
        await counselor.save();

        res.status(201).json({ message: 'Rating added successfully', counselor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};



export const getAverageRating = async (req, res) => {
    try {
        const { counselorId } = req.params;

        // Find the counselor by ID
        const counselor = await Counselor.findById(counselorId);

        // If counselor not found, return an error
        if (!counselor) {
            return res.status(404).json({ error: 'Counselor not found' });
        }

        // Calculate the average rating
        let totalRating = 0;
        for (const rating of counselor.rating) {
            totalRating += rating.rate;
        }
        const averageRating = totalRating / counselor.rating.length;

        res.status(200).json({ averageRating });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};