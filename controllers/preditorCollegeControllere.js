import College from '../models/college.schema.js';

export const filterCollegesByEntranceCriteria = async (req, res) => {
    try {
        const { entranceExam, year, rank, score, state, course, reservationCategory } = req.body;

        // Construct the filter object based on the entrance criteria provided
        const filter = {
            'entranceCriteria.entranceExam': entranceExam,
            'entranceCriteria.year': year,
            'entranceCriteria.rank': { $lte: rank }, // Less than or equal to the provided rank
            'entranceCriteria.score': { $lte: score }, // Less than or equal to the provided score
            'location.state': state,
            'entranceCriteria.course': course,
            'entranceCriteria.reservationCategory': reservationCategory
        };

        // Query the College model with the constructed filter
        const filteredColleges = await College.find(filter);

        // Extract the names of the filtered colleges
        const collegeNames = filteredColleges.map(college => college.name);

        // Return the filtered colleges
        res.json({ success: true, colleges: collegeNames });
    } catch (error) {
        console.error('Error filtering colleges:', error);
        res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
};
