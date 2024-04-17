import express from 'express';
import jwtAuth from '../middlewares/jwt.js';


import {multipleFilter} from '../controllers/commonAppController.js'

const commonRouter =express.Router();
//const commonRouter =express.Router();

commonRouter.get('/',multipleFilter);

export default commonRouter;
 