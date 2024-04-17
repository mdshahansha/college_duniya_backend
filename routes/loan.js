import express from 'express';
import { applied, checkEligibility, createBank, getAllBanks, getAllBanksByType } from '../controllers/loanController.js';
import jwtAuth from '../middlewares/jwt.js';

const loanRouter=express.Router();


loanRouter.get('/',getAllBanks);
loanRouter.post('/',jwtAuth,createBank);
loanRouter.post('/checkEligibility/',jwtAuth,checkEligibility);
loanRouter.post('/applied/:bankId',jwtAuth,applied);
loanRouter.get('/bankType',jwtAuth,getAllBanksByType);





export default loanRouter;