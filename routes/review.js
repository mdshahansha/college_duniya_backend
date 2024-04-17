import express from 'express'; 
import {createReview,getReviewsByCollegeId} from '../controllers/reviewController.js'
import jwtAuth from '../middlewares/jwt.js';


const reviewRoute = express.Router(); // Create a new Router instance

reviewRoute.use(express.json()); // Note: Corrected invocation of express.json()

reviewRoute.post('/', createReview);
reviewRoute.get('/:collegeId', jwtAuth,getReviewsByCollegeId);


export default reviewRoute;