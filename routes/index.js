import express from 'express';  

import {getColleges } from '../controllers/paginationController.js'

const indexRouter = express.Router(); // Create a new Router instance

indexRouter.use(express.json()); // Note: Corrected invocation of express.json()

indexRouter.get('/page', getColleges); 



export default indexRouter;