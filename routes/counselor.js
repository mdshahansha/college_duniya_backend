
import express from 'express';
import { upload } from '../middlewares/fileupload.middleware.js';
import { contactCounselor, createCounselor, createRating, getAverageRating, getCounselorAll } from '../controllers/counselorController.js';
import jwtAuth from '../middlewares/jwt.js';

const counselorRouter=express.Router();


counselorRouter.post('/',upload,createCounselor);


counselorRouter.get('/get',getCounselorAll)

counselorRouter.post('/:userId/contactCounselor/:counselorId',jwtAuth,contactCounselor);

counselorRouter.post('/createRating/',jwtAuth,createRating);
counselorRouter.get('/getAverageRating/:counselorId',jwtAuth,getAverageRating);


export default counselorRouter
