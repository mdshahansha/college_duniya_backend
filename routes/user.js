import express from 'express';
import { upload } from '../middlewares/fileupload.middleware.js';
import {sendOtp,verifyOtp,updateUserDetails,getUserDetails, uploadDocuments, getUploadDocuments, createReferral, userRewards, sendEmailNotification, reporting, paymentHistory, testPerformance, signIn} from '../controllers/userController.js'
import {addCollegeRecommendation,addCollegeShortlist,addCollegeApplication,createFeed} from '../controllers/userController.js'
import {getAllReferralsByUserId,getCollegeRecommendations,getCollegeShortlist,getCollegeApplications, getAllMyFeeds} from '../controllers/userController.js';
import jwtAuth from '../middlewares/jwt.js';

const userRoute = express.Router(); // Create a new Router instance

userRoute.use(express.json()); // Note: Corrected invocation of express.json()

 


userRoute.post('/sendOtp', sendOtp);
userRoute.post('/verifyOtp', verifyOtp);
userRoute.post('/updateUserDetails/:id',jwtAuth, updateUserDetails); 
userRoute.get('/', getUserDetails);
userRoute.get('/signIn', signIn);


userRoute.post('/addCollegeRecommendation',jwtAuth, addCollegeRecommendation); 
userRoute.get('/getCollegeRecommendations/:userId',jwtAuth, getCollegeRecommendations); 

userRoute.post('/addCollegeShortlist/',jwtAuth, addCollegeShortlist); 
userRoute.get('/getCollegeShortlist/:userId',jwtAuth, getCollegeShortlist); 

userRoute.post('/addCollegeApplication/',jwtAuth, addCollegeApplication); 
userRoute.get('/getCollegeApplications/:userId',jwtAuth, getCollegeApplications); 

userRoute.post('/uploadDocuments/:userId',jwtAuth,upload,jwtAuth,uploadDocuments);
userRoute.get('/getUploadDocuments/:userId',jwtAuth,getUploadDocuments);

userRoute.post('/createFeed/',jwtAuth,createFeed);
userRoute.get('/getAllMyFeeds/:userId',jwtAuth,getAllMyFeeds);


userRoute.post('/createReferral/:userId',jwtAuth,createReferral);
userRoute.get('/getAllReferralsByUserId/:userId',jwtAuth,getAllReferralsByUserId);
userRoute.get('/userReward/:userId',jwtAuth,userRewards);

userRoute.post('/alert',jwtAuth,sendEmailNotification);
userRoute.post('/report/:userId',jwtAuth,reporting);
userRoute.get('/paymentHistory',jwtAuth,paymentHistory);
userRoute.get('/testPerformance/:userId',jwtAuth,testPerformance);

// userRoute.post('/addCollegeToCollegeShortlist', addCollegeToCollegeShortlist); 
// userRoute.get('/:userId/addCollegeToApplication/:collegeId', addCollegeToApplication); 
// userRoute.get('/transferCollegeFromRecommendationToShortlist/:userId', transferCollegeFromRecommendationToShortlist); 






export default userRoute;


