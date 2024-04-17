import College from '../models/college.schema.js'; // Import your College model

export const getColleges = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Default to first page if page parameter is not provided
        const pageSize = parseInt(req.query.pageSize) || 20; // Default page size to 20 if pageSize parameter is not provided

        // Calculate the number of documents to skip
        const skip = (page - 1) * pageSize;
console.log("sds")
        // Query the database for colleges with pagination
        const totalColleges = await College.countDocuments();

        const colleges = await College.find().skip(skip).limit(pageSize);

        // Send paginated results to the client
        res.json({
            currentPage: page,
            pageSize: pageSize,
            totalPages: Math.ceil(totalColleges / pageSize), // Calculate total pages based on total documents and page size
            totalCount: totalColleges, // Optionally, send total count of documents
            colleges: colleges // Send paginated colleges data
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
 
