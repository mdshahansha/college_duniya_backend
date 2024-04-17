import express from 'express'; 
import { academicAndDocument, applicationAcknowledgment, basicDetails, createOrder, paymentCallBack, paymentCancel, paymentDeclaration, proccedToPay, renderProductPage } from '../controllers/paymentController.js';
const paymentRouter=express.Router();
import jwtAuth from '../middlewares/jwt.js';

import { upload } from '../middlewares/fileupload.middleware.js';

// paymentRouter.set('view engine','ejs');
// paymentRouter.set('views',path.join(__dirname, '../views'));



paymentRouter.post('/proccedToPay',jwtAuth, proccedToPay);
paymentRouter.post('/basicDetails',jwtAuth, basicDetails);
paymentRouter.post('/academicAndDocument/:paymentId',upload,jwtAuth, academicAndDocument);
paymentRouter.post('/paymentDeclaration',jwtAuth,paymentDeclaration );


paymentRouter.post('/createOrder', jwtAuth, createOrder);
paymentRouter.get('/:paymentId',  renderProductPage);
// paymentRouter.post('/orders',getOrderID)
paymentRouter.post('/payment-callback', paymentCallBack)
paymentRouter.get('/payment-cancel', paymentCancel)

paymentRouter.get('/applicationAcknowledgment', applicationAcknowledgment)


export default paymentRouter;