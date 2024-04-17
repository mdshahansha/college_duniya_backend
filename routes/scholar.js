import express from 'express';
import  {multipleFilter}  from '../controllers/scholarController.js';
import jwtAuth from '../middlewares/jwt.js';

const scholarRoute = express.Router(); // Create a new Router instance
 
scholarRoute.get('/',jwtAuth,multipleFilter);

export default scholarRoute;