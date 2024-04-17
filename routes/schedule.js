import express from 'express';

 
import {createScheduleCall,createScheduleVisit,getScheduleCalls,getScheduleVisits} from '../controllers/scheduleController.js'
import jwtAuth from '../middlewares/jwt.js';


const scheduleRoute = express.Router(); // Create a new Router instance

scheduleRoute.use(express.json()); // Note: Corrected invocation of express.json()

scheduleRoute.post('/:userId/call/:collegeId',jwtAuth, createScheduleCall);
scheduleRoute.post('/:userId/visit/:collegeId',jwtAuth, createScheduleVisit);
scheduleRoute.get('/call',jwtAuth, getScheduleCalls);
scheduleRoute.get('/visit',jwtAuth, getScheduleVisits);



export default scheduleRoute;