import express from 'express';
import bodyParser from 'body-parser';
import {connectUsingMongoose} from './config/mongoose.js' 

import userRoute from './routes/user.js'
import collegeRoute from './routes/college.js'
import reviewRoute from './routes/review.js';
import scheduleRoute from './routes/schedule.js'

import RequestCall from './models/callRequest.schema.js'
import User from './models/user.schema.js'
import Insurance from './models/insurance.schema.js';
import { filterCollegesByEntranceCriteria } from './controllers/preditorCollegeControllere.js';
import scholarRoute from './routes/scholar.js';
import commonRouter from './routes/commonApp.js';
import indexRouter from './routes/index.js';
import counselorRouter from './routes/counselor.js';
import { topCitiesData, topCourses, topExams } from './controllers/topController.js';
import testRouter from './routes/test.js';
import loanRouter from './routes/loan.js';
import dotenv from "dotenv";
import paymentRouter from './routes/payment.js';
import jwtAuth from './middlewares/jwt.js';
import path from 'path';
// load all the environment variables in application
import ejsLayouts from 'express-ejs-layouts';

dotenv.config();

const app = express();
const PORT = 3000;
 
app.use(bodyParser.json());

 
app.use(express.urlencoded()); 
// app.use(bodyparser);

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.json());


app.use(ejsLayouts);

app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, '../views')); // Assuming your views directory is in the parent directory of routes
app.set('view engine', 'ejs');
app.set(
  'views',
  path.join(path.resolve(), 'views')
);
// Use express router

app.use('/', userRoute); 
app.use('/college',collegeRoute)
app.use('/review',reviewRoute)
app.use('/schedule',scheduleRoute)
app.use('/collegePreditor',filterCollegesByEntranceCriteria)
app.use('/scholar',scholarRoute)
app.use('/common',commonRouter);
app.use('/counselor',counselorRouter);
app.use('/test',testRouter);
app.use('/bank',loanRouter)
app.use('/index',indexRouter)
app.use('/payment',paymentRouter)




// Route to handle GET requests to retrieve all data
app.get('/data', (req, res) => {
    res.json(jsonData);
});
app.get('/topUniversities',(req, res) => {
  res.json(topCitiesData.topCities);
});
app.get('/topCourses',(req, res) => {
  res.json(topCourses);
});

app.get('/topExams',(req, res) => {
  res.json(topExams);
});






const createRequestCallback = async (req, res) => {
  try {
    // Extract data from the request body
    const { userId } = req.params;

    // Check if there is already a request call associated with the user ID
    const existingRequestCall = await RequestCall.findOne({ user: userId });

    // If a request call already exists, return an error
    if (existingRequestCall) {
      return res.status(400).json({ error: 'Request callback already exists for this user' });
    }

    // Find the user in the database
    const user = await User.findById(userId);

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Extract necessary data from the user object
    const { basicDetails: { fullName }, contactDetails: { email, mobileNumber } } = user;

    // Create a new instance of RequestCall model
    const requestCall = new RequestCall({
      user: userId,
      contactDetails: {
        name: fullName,
        email,
        mobileNumber
      }
    });

    // Save the request call to the database
    const savedRequestCall = await requestCall.save();

    // Return success response
    return res.status(201).json(savedRequestCall);
  } catch (error) {
    // Handle errors
    console.error('Error creating request callback:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const getRequestCallbacks = async (req, res) => {
  try {
      // Retrieve all request callback queries from the database
      const requestCallbacks = await RequestCall.find();

      // Send the retrieved data as a response
      res.status(200).json(requestCallbacks);
  } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error fetching request callback queries:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

app.post('/createRequestCallback/:userId',createRequestCallback);
app.get('/getRequestCallbacks',getRequestCallbacks);
app.get('/carrerCompass', (req, res) => {
  const loremIpsum = {
    content: "Congratulations Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum , ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.",
    disclaimer: "Disclaimer : Forem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit inte rdum, ac aliquet odio mattis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos."
  };
  res.json(loremIpsum);
}); 
// Controller to create a new insurance entry
export const createInsurance = async (req, res) => {
    try {
        const {userId}=req.params;
    
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
 const { basicDetails: { fullName }, contactDetails: { email, mobileNumber } } = user;
        const contactDetails = {
            name: fullName,
            email,
            mobileNumber
        }; 
        const data = new Insurance({
           contactDetails
        });

        // Save the schedule call
        await data.save();
        res.status(201).json(data);
    } catch (error) {
        console.error("Error creating schedule call:", error);
        throw error;
    }
}

// Controller to get all insurance entries
export const getAllInsurance = async (req, res) => {
    try {
        // Retrieve all insurance documents from the database
        const allInsurance = await Insurance.find();

        // Respond with the list of insurance documents
        res.status(200).json({ success: true, insurance: allInsurance });
    } catch (error) {
        console.error('Error getting insurance:', error);
        res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
};

app.post('/insurance/:userId', createInsurance);
app.get('/insurance', getAllInsurance);

app.get('/test',(req,res)=>{
    res.send(`<h1>Welcome to clone shiksha</h1>`)
})

app.listen(PORT, () => {
    
  console.log(`Server is running on ${PORT}`);
  connectUsingMongoose();
    
});
