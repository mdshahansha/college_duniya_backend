import Razorpay from 'razorpay';
import crypto from 'crypto' ; 
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;

import Payment from "../models/payment.schema.js";
import User from "../models/user.schema.js";
import mongoose from 'mongoose';
const { Types: { ObjectId } } = mongoose;


export const proccedToPay = async (req, res) => {
    const { collegeId, courses, amount } = req.body;
    const userId = req.userID;

    try {
        const payment = await Payment.create({
            user: userId,
            college: collegeId,
            courses,
            amount
            // You can add other fields here if needed
        });

        res.status(200).json({ success: true, data: payment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



export const basicDetails = async (req, res) => {
    const { nationality, paymentId } = req.body; // Extract nationality and paymentId from request body
    const userId = req.userID;
    console.log("payemnt  ",paymentId); 
    try {
        
        // Find the payment details based on the provided paymentId
        const payment = await Payment.findById(paymentId); 

        console.log(" # ",payment)

        if (!payment) {
            return res.status(404).json({ success: false, error: 'Payment not found' });
        }

        // Find the user details based on the user ID (assuming user ID is stored in the payment document)
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Update the personalDetails field of the payment object with the new data
        payment.personalDetails = {
            title: user.basicDetails.title,
            firstName: user.basicDetails.fullName.split(' ')[0] || '',
            middleName: user.basicDetails.fullName.split(' ')[1] || '',
            lastName: user.basicDetails.fullName.split(' ')[2] || '',
            gender: user.basicDetails.gender,
            socialCategory: user.basicDetails.socialCategory,
            nationality: nationality,
            dob: user.basicDetails.dob,
            mobileNumber: user.contactDetails.mobileNumber,
            email: user.contactDetails.email
        };

        // Save the updated payment object
        await payment.save();

        const filledData = {};
        for (const [key, value] of Object.entries(payment.personalDetails)) {
            if (value !== undefined && value !== null && value !== '') {
                filledData[key] = value;
            }
        }

        res.status(200).json({ success: true, data: filledData });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

 

export const academicAndDocument = async (req, res) => {
    const { paymentId } = req.params;
    const userId = req.userID;

    try {
        // Fetch the payment details based on the provided paymentId
        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({ success: false, error: "Payment not found" });
        }

        // Fetch the user details based on the user ID stored in the payment document
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        // Extract relevant academic and document details from the user
        const { educationDetails, documents } = user;

        // Update the academic and document details in the payment schema
        payment.academicDetailAndDocument = {
            classX: educationDetails.classX,
            classXII: educationDetails.classXII,
            graduation: educationDetails.graduation,
            documents: {
                classX: documents.classX,
                classXII: documents.classXII,
                jeeMainRankCard: documents.jeeMainRankCard,
                graduation: documents.graduation,
                addharCard: req.files[0].images,
                photo: req.files[1].images
            }
        };
        console.log("  ",req.files[0].images)

        // Save the updated payment document
        const updatedPayment = await payment.save();

        // Prepare filledData object for response
        const filledData = {};
        for (const [key, value] of Object.entries(updatedPayment.academicDetailAndDocument)) {
            if (value !== undefined && value !== null && value !== '') {
                filledData[key] = value;
            }
        }

        res.status(200).json({ success: true, data: filledData });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message });
    }
};


export const paymentDeclaration = async (req, res) => {
    const userId = req.userID;
    const { paymentId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const payment = await Payment.findById(paymentId);

        if (!payment) {
            return res.status(404).json({ success: false, error: "Payment not found" });
        }

      
        const userIdPart = userId.toString().substring(0, 5);
        const paymentIdPart = paymentId.toString().substring(0, 5); // Take first 5 characters of the payment ID
        const timestampPart = Date.now().toString(36).slice(-5);
        const applicationNumber = userIdPart + paymentIdPart + timestampPart;
        // Save the updated payment object
  // Update the declaration field in the payment schema
  payment.decleration = true; // Correct way to update a field in an object
  payment.applicationNumber=applicationNumber;
        await payment.save();

        // Construct response data
        
        // Send response
        res.status(200).json({ success: true, data: payment });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


//acknlogement print create 


export const createOrder = async (req, res) => {
    const { paymentId } = req.body;
    try {
        // Find the payment based on the provided paymentId
        const payment = await Payment.findById(paymentId);

        // Check if payment exists
        if (!payment) {
            return res.status(404).json({ success: false, error: "Payment not found" });
        }

        // Set up options for creating the order
        const amount = payment.amount * 100;
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: "TXN" + Date.now(),
        };

        // Create the order using Razorpay API
        razorpayInstance.orders.create(options, async (err, order) => {
            if (err) {
                // Handle error if order creation fails
                console.error("Error creating order:", err);
                return res.status(400).json({ success: false, msg: 'Something went wrong!' });
            }

            // Update payment with the online transaction order ID
            payment.onlineTrasactionOrderID = order.id;
            await payment.save(); // Save the updated payment

            // Send success response with order details
            res.status(200).json({
                success: true,
                msg: 'Order Created',
                order_id: order.id,
                amount: amount,
                key_id: RAZORPAY_ID_KEY,
                course_name: payment.courses,
                contact: payment.personalDetails.mobileNumber,
                name: payment.personalDetails.firstName,
                email: payment.personalDetails.email
            });
        });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};


export const renderProductPage = async(req,res)=>{

    try {
        const { paymentId } = req.params;
        const payment = await Payment.findById(paymentId);
        if (!payment) {
            return res.status(404).json({ success: false, error: "Payment not found" });
        }
    
        // Render the EJS template 'product' and pass payment data to it
        res.render('product', { payment: payment }); // Assuming you want to pass the entire payment object
    
    } catch (error) {
        console.log(error.message);
    }

}




export const paymentCallBack = async(req, res)=>{
    //if it work then we use to send params as req as payment id
    const {razorpay_signature, razorpay_payment_id, razorpay_order_id} = req.body;

   console.log(req.body)
    try{
        const string = `${razorpay_order_id}| ${razorpay_payment_id}`;
        const generated_signature = crypto
        .createHmac('sha256', RAZORPAY_ID_KEY)
        .update(string)
        .digest("hex");

        if (generated_signature == razorpay_signature)
            console.log('payment successfull')
             return res.json({success:true,message:"Trasaction Succefully completded"})//json format will sended
    }

      catch (error) {
        console.log(error.message);
      }
}

export const paymentCancel=async (req,res)=>{
    try {
        return res.json({success:false,message:"FAILLLL"})
    } catch(error){
       console.log(error.message); 
    }  
}
 


export const applicationAcknowledgment =async (req,res)=>{
    //todo
}



//no need for this
// const getOrderID = async (req,res)=>{
//     try{
//      var instance = new Razorpay({key_id: process.env.KEY_ID, key_secret: process.env.KEY_SECRET});

//      var options = {
//          amount: req.body.amount * 100,
//          currency: "INR",
//          receipt: "TXN" + Date.now(),
//          notes:{
//              key1: req.body.name,
//              key2: req.body.email,
//              key3: req.body.number,
//              key4: req.body.address,
//              key5: req.body.product,
//              key6: req.body.profile_name
//          }
//         };
//     instance.orders.create(options, function (err, order) {
//         if(order){
//              return res.send(order.id)
//          } else {
//             console.log(err);
//          }
//         })
//     }catch(error){
//         console.log(error.message)
//     }

// }


// import logo from './logo.svg';
// import './App.css';


// function loadScript(src) {
//   return new Promise((resolve) => {
//     const script = document.createElement('script')
//     script.src = src
//     script.onload = () => {
//       resolve(true)
//     }
//     script.onerror = () => {
//       resolve(false)
//     }
//     document.body.appendChild(script)
//   })
// }

// function App() {

// async function displayRazorpay () {

//     const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

//       if (!res){
//         alert('Razropay failed to load!!')
//         return 
//       }

//       const data = await fetch('http://localhost:1769/razorpay', {method: 'POST'}).then((t) => 
//         t.json()
//       ) 

//       console.log(data)

//     const options = {
//       "key": "YOUR_KEY_ID", // Enter the Key ID generated from the Dashboard
//       "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//       "currency": "INR",
//       "name": "Acme Corp",
//       "description": "Test Transaction",
//       "image": "https://example.com/your_logo",
//       "order_id": "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//       "callback_url":"http://localhost:1769/verify",
//       "notes": {
//           "address": "Razorpay Corporate Office"
//       },
//       "theme": {
//           "color": "#3399cc"
//       }
//   };
//   const paymentObject = new window.Razorpay(options); 
//   paymentObject.open();
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />   
//         <button
//         onClick={displayRazorpay}
//         >
//           Pay now 
//         </button>
//       </header>
//     </div>
//   );
// }

// export default App;