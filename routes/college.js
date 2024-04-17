

import express from 'express';
import { upload } from '../middlewares/fileupload.middleware.js';

import {createCollege,uploadGallery,createReview} from '../controllers/collegeController.js'
import {getCollege,getCollegeById,compareColleges,viewAllCourseAndFees} from '../controllers/collegeController.js'
import jwtAuth from '../middlewares/jwt.js';


const collegeRoute = express.Router(); // Create a new Router instance

collegeRoute.use(express.json()); // Note: Corrected invocation of express.json()




collegeRoute.post('/', createCollege);
collegeRoute.post('/uploadGallery/:id',jwtAuth,upload,uploadGallery);
collegeRoute.post('/:userId/createReview/:collegeId',jwtAuth,createReview);//pending -> user me insert karenge
 

collegeRoute.get('/',getCollege);
collegeRoute.get('/:collegeId',getCollegeById);
collegeRoute.get('/:collegeId1/compareColleges/:collegeId2',compareColleges);
collegeRoute.get('/viewAllCourseAndFees/:collegeId',viewAllCourseAndFees);
// collegeRoute.get('/:collageId',getCollegeById);

 



export default collegeRoute;


