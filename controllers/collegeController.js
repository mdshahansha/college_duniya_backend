import College from '../models/college.schema.js';  

 
export const createCollege = async (req, res) => {
  try {
    const newCollege = new College({ ...req.body });
    const savedCollege = await newCollege.save();
    res.status(201).json(savedCollege);
  } catch (error) {
    console.error('Error creating college:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// export const createCollege = async (req, res) => {
//   try {
//     const {
//       // Info data
//       name,
//       lastUpdate,
//       quickFacts,
//       highlights,
//       ranking,
//       coursesAndFees,
//       // Placements data
//       latestUpdate,
//       tableOfContentPlacement,
//       highlightsPlacement,
//       placementInfo,
//       placementProcess,
//       // Courses and fees data
//       courseAndFee,
//       courseAndFeeDetail,
//       courseAndFeesStructure,
//       entranceExamsAccepted,
//       feePaymentGuidelines,
//       allBranchTech,
//       // Admission data
//       admission,
//       // Cutoff data
//       content,
//       updates,
//       tableOfContentCutOff,
//       cutOffArticle,
//       managementcutOff,
//       // Infrastructure data
//       library,
//       digitalLibrary,
//       networkFacilities,
//       ciscoNetworkingAcademy,
//       hostels,
//       sportsFacilities,
//       guestHouse,
//       canteen,
//       amenitiesComplex,
//       banksAtm,
//       // Scholarship data
//       BtechScholarShip,
//       BScScholarShip,
//       MtechScholarShip,
//       feeDetails,
//       // Location data
//       location
//     } = req.body;

//     // Create a new instance of College model
//     const newCollege = new College({
//       name,
//       info: {
//         lastUpdate,
//         quickFacts,
//         highlights,
//         ranking,
//         coursesAndFees
//       },
//       placements: {
//         latestUpdate,
//         tableOfContentPlacement,
//         highlightsPlacement,
//         placementInfo,
//         placementProcess
//       },
//       coursesAndFees: {
//         courseAndFee,
//         courseAndFeeDetail,
//         courseAndFeesStructure,
//         entranceExamsAccepted,
//         feePaymentGuidelines,
//         allBranchTech
//       },
//       admission,
//       cutoff: {
//         content,
//         updates,
//         tableOfContentCutOff,
//         cutOffArticle,
//         managementcutOff
//       },
//       infrastructure: {
//         library,
//         digitalLibrary,
//         networkFacilities,
//         ciscoNetworkingAcademy,
//         hostels,
//         sportsFacilities,
//         guestHouse,
//         canteen,
//         amenitiesComplex,
//         banksAtm
//       },
//       scholarship: {
//         BtechScholarShip,
//         BScScholarShip,
//         MtechScholarShip,
//         feeDetails
//       },
//       location
//     });

//     // Save the new instance to the database
//     const savedCollege = await newCollege.save();

//     res.status(201).json(savedCollege); // Respond with the saved college data
//   } catch (error) {
//     console.error('Error creating college:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

 


// update these criteria -> Gallery &  reviews
export const uploadGallery=async (req,res)=>{
      try {
        // Extract the uploaded image URLs from req.files
        const infrastructureImageURL = req.files[0].path;
        const uploadImageUrl = req.files[1].path;
        const campusImageUrl = req.files[2].path;
    
        // Find the college document by its ID (assuming you have the ID in req.body)
        const collegeId = req.params.id; // Make sure to send collegeId in request body
        console.log("collegeId  ",collegeId)
        
        const college = await College.findById(collegeId);
     
        // Update the gallery field with the uploaded image URLs
        college.gallery =[{
          infrastructureImageURL,
          uploadImageUrl,
          campusImageUrl
        }];
    
        // Save the updated college document
        await college.save();
    
        // Return success response
        res.status(200).json({ message: 'Images uploaded and college document updated successfully' });
      } catch (error) {
        console.error('Error uploading images and updating college document:', error);
        res.status(500).json({ error: 'An unexpected error occurred' });
      }

    

}


export const createReview=async (req,res)=>{

}

export const getCollege=async (req,res)=>{
    try {
        // Retrieve college data from the database
        const colleges = await College.find();
    
        // Return the retrieved college data as a response
        return res.status(200).json({ colleges });
      } catch (error) {
        // Handle errors and send an error response
        console.error('Error retrieving college data:', error);
        return res.status(500).json({ error: 'An unexpected error occurred while fetching college data' });
      }
}
export const getCollegeById=async (req,res)=>{
    try {
        // Retrieve college data from the database
        const {collegeId}=req.params
console.log(req.params," collegeId",collegeId)
        const colleges = await College.findById(collegeId);
    
        // Return the retrieved college data as a response
        return res.status(200).json({ colleges });
      } catch (error) {
        // Handle errors and send an error response
        console.error('Error retrieving college data:', error);
        return res.status(500).json({ error: 'An unexpected error occurred while fetching college data' });
      }
}

// Function to fetch data for a single college by its ID
export const getCollegeByIdCompare = async (collegeId) => {
    try {
      const college = await College.findById(collegeId);
      return college;
    } catch (error) {
      console.error('Error fetching college data by ID:', error);
      throw error; // Throw the error to handle it in the calling function
    }
  };
  
export const compareColleges = async (req, res) => {
    try {
      const { collegeId1, collegeId2 } = req.params; // Extract college IDs from request parameters
    //   console.log(collegeId1," params ",collegeId2)
  
      // Fetch data for the first college
      const college1 = await getCollegeByIdCompare(collegeId1);
      if (!college1) {
        return res.status(404).json({ error: 'College 1 not found' });
      }
   
      // Fetch data for the second college
      const college2 = await getCollegeByIdCompare(collegeId2);
      if (!college2) {
        return res.status(404).json({ error: 'College 2 not found' });
      }
  
      // Construct JSON object with data of both colleges
      const comparisonData = {
        column1: college1,
        column2: college2
      };
  
      // Return the comparison data as JSON response
      res.status(200).json(comparisonData);
    } catch (error) {
      console.error('Error comparing colleges:', error);
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  };
 
export const viewAllCourseAndFees=async (req,res)=>{ 
        try {
          const { collegeId } = req.params; // Extract college ID from request parameters
      
          // Fetch data for the specified college
          const college = await getCollegeByIdCompare(collegeId);
          if (!college) {
            return res.status(404).json({ error: 'College not found' });
          }
      
          // Extract and return course and fees information from the college data
          const courseAndFees = college.coursesAndFees;
          res.status(200).json({ courseAndFees });
        } catch (error) {
          console.error('Error viewing course and fees:', error);
          res.status(500).json({ error: 'An unexpected error occurred' });
        }
      
};


