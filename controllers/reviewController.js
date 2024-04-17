import College from '../models/college.schema.js';  
import Review  from '../models/review.schema.js'; // Import Review schema



export const createReview = async (req, res) => {
    try {
      const { collegeId, userId, article, rating } = req.body;
  
      // Create a new review instance
      const newReview = new Review({
        college: collegeId,
        user: userId,
        article,
        rating
      });
  
      // Save the new review to the database
      const savedReview = await newReview.save();
  
      // Update the college document to include the new review
      const college = await College.findByIdAndUpdate(
        collegeId,
        { $push: { reviews: savedReview._id } }, // Add the review ID to the reviews array
        { new: true } // Return the updated college document
      );
  
      res.status(201).json(savedReview); // Respond with the saved review data
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  // Controller function to get all reviews for a particular college
  export const getReviewsByCollegeId = async (req, res) => {
    try {
        const { collegeId } = req.params;

        // Find all reviews from the database that match the given college ID
        const reviews = await Review.find({ college: collegeId });

        // If no reviews are found, return a 404 error
        if (!reviews || reviews.length === 0) {
            return res.status(404).json({ error: 'No reviews found for this college' });
        }

        // Respond with the found reviews
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error getting reviews for college:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
