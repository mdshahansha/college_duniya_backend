import OTP from '../models/otp.schema.js';
import twilio from 'twilio';
import User from '../models/user.schema.js';
import ScheduleCall from '../models/scheduleCall.schema.js';
import ScheduleVisit from '../models/scheduleVisit.schema.js';
import College from '../models/college.schema.js'
import Refferal from '../models/refferal.schema.js'; 
import Report from '../models/report.schema.js';
import jwt from 'jsonwebtoken'


import dotenv from "dotenv";
// load all the environment variables in application
dotenv.config();



const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


export const sendOtp = async (req, res) => {
  const { mobileNumber, fullName, email, city, educationDetails } = req.body;
  try {
    const generatedOTP = Math.floor(100000 + Math.random() * 900000);
    await OTP.create({ mobileNumber, fullName, email, city, otp: generatedOTP.toString(), educationDetails });
    await twilioClient.messages.create({
      body: `shiksha otp : ${generatedOTP} select your colleges`,
      from: "+15642343143",
      to: mobileNumber
    });
    return res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

//setup passowrd while verifying the OTP
export const verifyOtp = async (req, res) => {
  const { mobileNumber, otp ,password} = req.body;
  try {
    const otpData = await OTP.findOne({ mobileNumber, otp });
    if (!otpData) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    let user = await User.findOne({ 'contactDetails.mobileNumber': mobileNumber });

    if (!user) {
      // If user does not exist, create a new user
      user = new User({
        basicDetails: {
          fullName: otpData.fullName,
        },
        contactDetails: {
          mobileNumber: otpData.mobileNumber,
          email: otpData.email,
          city: otpData.city,
        },
        educationDetails: otpData.educationDetails,
        password
      });
    } else {
      // If user exists, update the user's details
      user.basicDetails.fullName = otpData.fullName;
      user.contactDetails.email = otpData.email;
      user.contactDetails.city = otpData.city;
      user.educationDetails = otpData.educationDetails;
    }

    // Save or update the user details
    await user.save();

    // Delete OTP after successful verification
    await OTP.deleteOne({ mobileNumber });

    res.json({ message: 'User registered/updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to register/update user' });
  }
};

 
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log("Received credentials: ", email, password);

  try {
      const user = await User.findOne({ 'contactDetails.email': email });
      // console.log("User found: ", user);

      if (!user) {
          return res.status(400).send('User not found');
      } else {
          console.log("Comparing passwords: ", password, user.password);
          if (password === user.password) {
              // Passwords match
              const token = jwt.sign(
                  { userID: user._id },
                  'AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz',
                  { expiresIn: '12h' }
              );
              return res.status(200).send(token);
          } else {
              // Passwords don't match
              return res.status(400).send('Incorrect password');
          }
      }
  } catch (err) {
      console.log("Error:", err);
      return res.status(500).send("Internal Server Error");
  }
};



export const updateUserDetails = async (req, res) => {
  const { id } = req.params; // Assuming id is provided in the request parameters
  const userData = req.body; // Assuming the new user data is provided in the request body

  try {
    // Retrieve the user document by user ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('Test',userData);
    // Update user data with the provided information
    user.basicDetails.fullName = userData.basicDetails.fullName;
    user.basicDetails.dob = userData.basicDetails.dob;
    user.basicDetails.socialCategory = userData.basicDetails.socialCategory;
    user.basicDetails.gender = userData.basicDetails.gender;
    user.basicDetails.maritalStatus = userData.basicDetails.maritalStatus;
    user.basicDetails.physicalChanges = userData.basicDetails.physicalChanges;

    user.contactDetails.mobileNumber = userData.contactDetails.mobileNumber;
    user.contactDetails.email = userData.contactDetails.email;
    user.contactDetails.city = userData.contactDetails.city;
    user.contactDetails.state = userData.contactDetails.state;

    user.educationDetails.classX.board = userData.educationDetails.classX.board;
    user.educationDetails.classX.school = userData.educationDetails.classX.school;
    user.educationDetails.classX.passingYear = userData.educationDetails.classX.passingYear;
    user.educationDetails.classX.markType = userData.educationDetails.classX.markType;
    user.educationDetails.classX.percentageOrCGPA = userData.educationDetails.classX.percentageOrCGPA;

    user.educationDetails.classXII.board = userData.educationDetails.classXII.board;
    user.educationDetails.classXII.passingYear = userData.educationDetails.classXII.passingYear;
    user.educationDetails.classXII.stream = userData.educationDetails.classXII.stream;
    user.educationDetails.classXII.markType = userData.educationDetails.classXII.markType;
    user.educationDetails.classXII.percentageOrCGPA = userData.educationDetails.classXII.percentageOrCGPA;

 

    user.educationDetails.graduation.college = userData.educationDetails.graduation.college;
    user.educationDetails.graduation.passingYear = userData.educationDetails.graduation.passingYear;
    user.educationDetails.graduation.degree = userData.educationDetails.graduation.degree;
    user.educationDetails.graduation.markType = userData.educationDetails.graduation.markType;
    user.educationDetails.graduation.percentage = userData.educationDetails.graduation.percentage;
 
    user.examDetails.preferences.stream = userData.examDetails.preferences.stream;
    user.examDetails.preferences.level = userData.examDetails.preferences.level;
    user.examDetails.preferences.specialization = userData.examDetails.preferences.specialization;
    user.examDetails.preferences.location = userData.examDetails.preferences.location;
    user.examDetails.preferences.collegeType = userData.examDetails.preferences.collegeType;
    user.examDetails.preferences.feeRange = userData.examDetails.preferences.feeRange;
    user.examDetails.preferences.college = userData.examDetails.preferences.college;
    user.examDetails.preferences.noPreferenceInStudyingAbroad = userData.examDetails.preferences.noPreferenceInStudyingAbroad;
    user.examDetails.preferences.needLoan = userData.examDetails.preferences.needLoan;

    // Save the updated user document
    const updatedUser = await user.save();

    res.json({ message: 'User details updated successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update user details' });
  }
};

export const getUserDetails = async (req, res) => {
    const { id } = req.params; // Assuming id is provided in the request parameters
      console.log('userId',id)
    try {
      // Retrieve the user document by user ID 
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Send the user details in the response
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch user details' });
    }
  };







 
 
export const addCollegeRecommendation = async (req, res) => {
    try {
        const { userId, collegeId } = req.body;

        // Find the user by userId
        const user = await User.findById(userId);

        // If user not found, throw an error
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Create a new recommendation object
        const recommendation = {
            college: collegeId
        };

        // Push the recommendation to the user's college recommendations array
        user.college.recommendation.push(recommendation);

        // Save the updated user document
        await user.save();

        // Return the updated user
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error adding college recommendation:", error);
        return res.status(500).json({ message: 'Failed to add college recommendation' });
    }
};

 export const getCollegeRecommendations= async (req,res) =>{
    try {
      const {userId}=req.params;
        const user = await User.findById(userId).populate({
            path: 'college.recommendation.college',
            model: 'College'
        });
        if (!user) throw new Error("User not found");

        // Extracting college information from the populated recommendation array
        const recommendations = user.college.recommendation.map(rec => rec.college);

        //return recommendations;
        return res.status(200).json(recommendations);
    } catch (error) {
        console.error("Error getting college recommendations:", error);
        throw error;
    }
}


// Add college to shortlist
export const addCollegeShortlist = async (req, res) => {
  try {
      const { userId, collegeId } = req.body;

      // Find the user by userId
      const user = await User.findById(userId);

      // If user not found, throw an error
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Add college to the shortlist
      user.college.collegeShortlist.push({ college: collegeId });

      // Save the updated user document
      await user.save();

      // Return the updated user
      return res.status(200).json(user);
  } catch (error) {
      console.error("Error adding college to shortlist:", error);
      return res.status(500).json({ message: 'Failed to add college to shortlist' });
  }
};

// Get shortlisted colleges
export const getCollegeShortlist = async (req, res) => {
  try {
      const { userId } = req.params;

      // Find the user by userId and populate the collegeShortlist
      const user = await User.findById(userId).populate({
          path: 'college.collegeShortlist.college',
          model: 'College'
      });

      // If user not found, throw an error
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Extract shortlisted colleges from the populated collegeShortlist array
      const shortlistedColleges = user.college.collegeShortlist.map(item => item.college);

      // Return the shortlisted colleges
      return res.status(200).json(shortlistedColleges);
  } catch (error) {
      console.error("Error getting shortlisted colleges:", error);
      return res.status(500).json({ message: 'Failed to get shortlisted colleges' });
  }
};

 

// Add college to application
export const addCollegeApplication = async (req, res) => {
    try {
        const { userId, collegeId } = req.body;
        // Find the user by userId
        const user = await User.findById(userId);
        // If user not found, throw an error
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Add college to the application
        user.college.application.push({ college: collegeId });
        // Save the updated user document
        await user.save();
        // Return the updated user
        return res.status(200).json(user);
    } catch (error) {
        console.error("Error adding college to application:", error);
        return res.status(500).json({ message: 'Failed to add college to application' });
    }
};

// Get college applications
export const getCollegeApplications = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user by userId and populate the application
        const user = await User.findById(userId).populate({
            path: 'college.application.college',
            model: 'College'
        });

        // If user not found, throw an error
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract applications from the populated application array
        const applications = user.college.application.map(item => item.college);

        // Return the applications
        return res.status(200).json(applications);
    } catch (error) {
        console.error("Error getting college applications:", error);
        return res.status(500).json({ message: 'Failed to get college applications' });
    }
};

export const uploadDocuments=async (req,res)=>{
  try {
    // Extract the uploaded image URLs from req.files
    const classX = req.files[0].path;
    const classXII = req.files[1].path;
    const  jeeMainRankCard= req.files[2].path;
    const  graduation= req.files[3].path;
    console.log(classX,' classX ',classXII,' cla ssX ' ,jeeMainRankCard)
    // Find the college document by its ID (assuming you have the ID in req.body)
    const {userId} = req.params; // Make sure to send collegeId in request body
    
    const user = await User.findById(userId);
    console.log("collegeId  ",user)
 
    // Update the gallery field with the uploaded image URLs
    user.documents ={
      classX,
      classXII,
      jeeMainRankCard,
      graduation,
    };

    console.log('images',user.documents);
    // Save the updated college document
    await user.save();

    // Return success response
    res.status(200).json({ message: 'Document uploaded and suer document updated successfully' });
  } catch (error) {
    console.error('Error uploading Document and updating user document:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
}

export const getUploadDocuments = async (req, res) => {
  const userId = req.params.userId; // Assuming user ID is passed as a parameter

  try {
      // Find the user by ID
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Extract document URLs from the user object
      const { classX, classXII, jeeMainRankCard, graduation } = user.documents;
console.log("images",user.documents)
      // Formulate response object with document URLs
      const documentUrls = {
          classX,
          classXII,
          jeeMainRankCard,
          graduation
      };

      // Send the response with document URLs
      res.status(200).json(documentUrls);
  } catch (error) {
      // Handle errors
      console.error("Error fetching user documents:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};
export const createFeed = async (req, res) => {
  const { userId, collegeId, content } = req.body;
  try {
      // Create a new feed object
      const newFeed = {
          content: content,
          user: userId
      };

      // Update myfeed array in User schema and populate it with the new feed object
      const updatedUser = await User.findByIdAndUpdate(
          userId,
          { $push: { myfeed: newFeed } },
          { new: true }
      ).populate('myfeed');

      // Update feeds array in College schema
      await College.findByIdAndUpdate(
          collegeId,
          { $push: { feeds: newFeed } },
          { new: true }
      );

      // Return the newly created feed in the response
      res.status(201).json({
          success: true,
          message: 'Feed created and updated successfully',
          feed: updatedUser.myfeed.slice(-1)[0]
      });
  } catch (error) {
      console.error('Error creating feed:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
  }
};

 

 
export const getAllMyFeeds = async (req, res) => {
    const { userId } = req.params; // Extract userId from request parameters

    try {
        // Find the user by userId and populate the myfeed field along with all content from the referenced college
        const user = await User.findById(userId).populate({
            path: 'myfeed',
            populate: {
                path: 'college',
                model: 'College'
            }
        });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const myfeeds = user.myfeed; // Extract myfeed from user

        // Return myfeeds in the response
        res.status(200).json({ success: true, myfeeds: myfeeds });
    } catch (error) {
        console.error('Error fetching myfeeds:', error);
        res.status(500).json({ success: false, error: 'An unexpected error occurred' });
    }
};
 

export const createReferral = async (req, res) => {
  try {
      // Extract userId from request parameters
      const { userId } = req.params;

      // Fetch the user details based on userId
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).json({ success: false, error: 'User not found' });
      }

      // Extract data from request body
      const {
          basicDetails,
          contactDetails,
          educationDetails,
          examDetails,
          preferences
      } = req.body;

      // Create a new referral document
      const newReferral = new Refferal({
          basicDetails,
          contactDetails,
          educationDetails,
          examDetails,
          preferences,
          refferedBy: {
              userId, // Store userId
              name: user.basicDetails.fullName // Assuming fullName is in basicDetails
          }
      });

      // Save the new referral document to the database
      const savedReferral = await newReferral.save();

      // Respond with the saved referral document
      res.status(201).json({ success: true, referral: savedReferral });
  } catch (error) {
      console.error('Error creating referral:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
  }
};
 
 
export const getAllReferralsByUserId = async (req, res) => {
  try {
      // Extract userId from request parameters
      const { userId } = req.params;

      // Find all referral documents where refferedBy.userId matches userId
      const referrals = await Refferal.find({ 'refferedBy.userId': userId });

      // Respond with the found referral documents
      res.status(200).json({ success: true, referrals });
  } catch (error) {
      console.error('Error getting referrals:', error);
      res.status(500).json({ success: false, error: 'An unexpected error occurred' });
  }
};



export const userRewards = async (req, res) => {
  try {
    // Find the user by ID
    const { userId } = req.params;
    console.log("#  ", userId);
    const user = await User.findById(userId);

    // If user is not found, return null
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    // Count the number of non-empty document fields
    let count = 0;
    if (user.documents.classX) count++;
    if (user.documents.classXII) count++;
    if (user.documents.jeeMainRankCard) count++;
    if (user.documents.graduation) count++;

    // Check if at least three document fields are available
    const hasThreeDocuments = count >= 3;

    // Return the response
    const response = {
      status: hasThreeDocuments ? 'success' : 'error',
      message: hasThreeDocuments ? 'Congratulation you got 50 points as rewards' : 'Upload 3 documents to get 50 points as rewards'
    }; 

    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: 'Internal server error' });
  }
}



// Function to send email notification based on user preferences
export const sendEmailNotification = async (req,res) => {
  try {

    const {userId}=req.params;
    const notification=req.body.notification;
      // Fetch user details from the database using the user ID
      const user = await User.findById(userId);

      // If user is not found, return error
      if (!user) {
          return 'User not found.';
      }

      // Extract user's email address from the user details
      const userEmail = user.contactDetails.email;

      // Create a transporter with your SMTP configuration
      let transporter = nodemailer.createTransport({
          host: 'smtp.example.com', // Your SMTP host
          port: 587, // Your SMTP port
          secure: false, // true for 465, false for other ports
          auth: {
              user: 'yourusername@example.com', // Your email address
              pass: 'yourpassword' // Your email password
          }
      });

      // Email notification content
      let mailOptions = {
          from: 'yourusername@example.com', // Sender email address
          to: userEmail, // Receiver email address
          subject: 'Notification', // Email subject
          text: 'You have a new notification.', // Plain text body
          html: '<p>You have a new notification from college HUB .</p>' // HTML body
      };

      // Send email notification if the user has enabled email notifications
      if (notification === 'yes') {
          let info = await transporter.sendMail(mailOptions);
          console.log('Email notification sent: ', info.messageId);
          return 'Email notification sent successfully.';
      } else {
          return 'Email notification not sent because user has disabled it.';
      }
  } catch (error) {
      console.error('Error sending email notification: ', error);
      return 'Failed to send email notification.';
  }
};


 
export const reporting = async (req, res) => {
  try {
    const { userId } = req.params;
    const { issue } = req.body;

    // Fetch the user details
    const user = await User.findById(userId);

    // If user is not found, return an error
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new report document
    const report = new Report({
      content: issue,
      user: userId, // Reference to the user document
      name: user.basicDetails.fullName // Assuming fullName is a field in basicDetails
    });

    // Save the report document to the database
    await report.save();

    // Return success response
    return res.status(200).json({ message: 'Report submitted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};



export const paymentHistory=async (req,res)=>{
  const data={
    "LoremIpsum": {
      "paragraphs": [
        "APPLY For More Colleges",
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        "Phasellus id erat maximus, congue enim ut, bibendum neque. Nulla et nunc sit amet ex ultrices dictum. Integer rhoncus malesuada risus, nec elementum felis suscipit sed. Sed lacinia pretium magna vel suscipit. Proin bibendum dolor et est tristique, id suscipit tortor finibus. Proin hendrerit tincidunt magna, eget vulputate nunc dapibus a. Pellentesque tincidunt sapien nec dolor fermentum interdum."
      ]
    }
  }
  
  res.json(data);
}


export const testPerformance=async (req,res)=>{
  const {userId}=req.params;
 
        try{
        // Find user by ID
        const user = await User.findById(userId);
        
        // Check if user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Return user's test performance
        res.json({ testPerformance: user.myTest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
  }



 