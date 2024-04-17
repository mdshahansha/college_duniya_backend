import express from 'express';
import { answersTest, questionTest } from '../controllers/testController.js';
import jwtAuth from '../middlewares/jwt.js';

const testRouter=express.Router()

testRouter.get('/questions',jwtAuth,questionTest);
testRouter.post('/answers/:userId',jwtAuth,answersTest);


export default testRouter;