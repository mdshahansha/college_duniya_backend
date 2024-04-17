import College from '../models/college.schema.js';

 

export const multipleFilter = async (req, res) => {
    try {
      // Construct query object dynamically based on request parameters
      const query = {};
    //   console.log(req.query)
  
      // Handling city selection
    //   if (req.query.city) {
    //     const cities = (req.query.city) ? req.query.city : [req.query.city];
    //     query['location.city'] = { $in: cities };
    //   }
   
  
        // Handling courses selection
      
  
        // Execute the query to find matching colleges
        // const colleges = await College.find({'location.city':'Mumbai'});
        // const colleges = await College.find({ 'collegeScholarShip.meritBasis':{ $in: ["collegeHUB", "12thExamination"] },'collegeScholarShip.genderBased':["male", "female"] });
       
        // const colleges = await College.find({ 
        //     $and: [
        //         { 'collegeScholarShip.meritBasis': { $in: ["collegeHUB", "12thExamination"] ,'collegeScholarShip.genderBased':["male", "female"] } },
        //         { 'location.city': 'Mumbai' } // Aap yahan apni location field ki condition ke hisab se query ko update kar sakte hain
        //     ]
        // });

        // const colleges = await College.find({ 
        //     $and: [
        //         { 
        //             'collegeScholarShip.meritBasis': { 
        //                 $in: ["collegeHUB", "12thExamination"] 
        //             }, 
        //             'collegeScholarShip.genderBased':{$in: ["male", "female"] }
        //         },
        //         { 
                   
        //         'location.city': 'Mumbai' ,
                    
        //         }
        //     ]
        // });
        //** THIS IS WORKING HARS (we made IT) */
        // const colleges = await College.find({  
        //     $and: [
        //         { 
        //             'collegeScholarShip.meritBasis': { 
        //                 $in: ["collegeHUB", "12thExamination"] 
        //             }, 
        //             'collegeScholarShip.collegeOffered': { 
        //                 $in: ["sportsKota"] 
        //             },
        //             'collegeScholarShip.incomeBased': { 
        //                 $in: ["ewsScholarship", "bplScholarship"] 
        //             },
        //             'collegeScholarShip.genderBased': { 
        //                 $in: ["male", "female"] 
        //             },
        //             'collegeScholarShip.otherScholarship': { 
        //                 $in: ["other"] 
        //             },
        //             'location.city': 'Mumbai',
        //         },
        //         { 
        //             courses: {$in:['Btech' ,'MTech']}
        //         }
        //     ]
        // });
        
        
        // const colleges = await College.find({ courses: {$in:['Btech' ,'MTech']}});
        const queryConditions = [];

        // Add criteria for scholarship
        if (req.query.meritBasis) {
            queryConditions.push({ 'collegeScholarShip.meritBasis': { $in: req.query.meritBasis.split(',') } });
        }
        if (req.query.collegeOffered) {
            queryConditions.push({ 'collegeScholarShip.collegeOffered': { $in: req.query.collegeOffered.split(',') } });
        }
        if (req.query.incomeBased) {
            queryConditions.push({ 'collegeScholarShip.incomeBased': { $in: req.query.incomeBased.split(',') } });
        }
        if (req.query.genderBased) {
            queryConditions.push({ 'collegeScholarShip.genderBased': { $in: req.query.genderBased.split(',') } });
        }
        if (req.query.otherScholarship) {
            queryConditions.push({ 'collegeScholarShip.otherScholarship': { $in: req.query.otherScholarship } });
        }

        // Add criteria for location
        if (req.query.city) {
            queryConditions.push({ 'location.city': req.query.city });
        }

        // Add criteria for courses
    //     if (req.query.courses) {
    //         const courses = Array.isArray(req.query.courses) ? req.query.courses : [req.query.courses];
    // queryConditions.push({ courses: { $in: req.query.courses } });
    //         // queryConditions.push({ courses: { $in: ['Btech' ,'MTech'] } });
    //     }

        
        // Construct the final query
        const finalQuery = { $and: queryConditions };
        // const finalQuery = { $and: [...queryConditions, { courses: { $in: req.query.courses } }] };//This line combines the queryConditions array with the courses condition using the spread operator .... This way, both conditions are included in the $and query.
        // const finalQuery = { $and: [...queryConditions} }] };

        console.log("_ ",finalQuery);

        // console.log("_ ",finalQuery['$and']);

        // Execute the query
        const colleges = await College.find(finalQuery);
        // console.log('finalQ ',colleges)
        // Return the result
        res.json(colleges);
        
        // const colleges = await College.find({courses:'MTech'})

      
//   console.log("_  ",colleges)
        // Return the matching colleges
        
    } catch (error) {
      // Handle error
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

// export const muiplefilter = async (req, res) => {
//   try {
//     // Construct pipeline stages for aggregation
//     const pipeline = [];

//     // Match stage for filtering based on request parameters
//     const matchStage = {};

//     // Handling multiple city selections
//     if (req.query.city) {
//       const cities = Array.isArray(req.query.city) ? req.query.city : [req.query.city];
//       matchStage['location.city'] = { $in: cities };
//     }

//     // Handling multiple courses selections
//     if (req.query.courses) {
//       const courses = Array.isArray(req.query.courses) ? req.query.courses : [req.query.courses];
//       matchStage.courses = { $in: courses };
//     }

//     // Handling multiple selections for collegeScholarShip->meritBasis
//     if (req.query.meritBasis) {
//       const meritBasis = Array.isArray(req.query.meritBasis) ? req.query.meritBasis : [req.query.meritBasis];
//       matchStage['collegeScholarShip.meritBasis'] = { $in: meritBasis };
//     }

//     // Handling multiple selections for collegeOffered
//     if (req.query.collegeOffered) {
//       const collegeOffered = Array.isArray(req.query.collegeOffered) ? req.query.collegeOffered : [req.query.collegeOffered];
//       matchStage['collegeScholarShip.collegeOffered'] = { $in: collegeOffered };
//     }

//     // Handling multiple selections for incomeBased
//     if (req.query.incomeBased) {
//       const incomeBased = Array.isArray(req.query.incomeBased) ? req.query.incomeBased : [req.query.incomeBased];
//       matchStage['collegeScholarShip.incomeBased'] = { $in: incomeBased };
//     }

//     // Handling genderBased
//     if (req.query.genderBased) {
//       const genderBased = Array.isArray(req.query.genderBased) ? req.query.genderBased : [req.query.genderBased];
//       matchStage['collegeScholarShip.genderBased'] = { $in: genderBased };
//     }

//     // Handling otherScholarship
//     if (req.query.otherScholarship) {
//       const otherScholarship = Array.isArray(req.query.otherScholarship) ? req.query.otherScholarship : [req.query.otherScholarship];
//       matchStage['collegeScholarShip.otherScholarship'] = { $in: otherScholarship };
//     }

//     // Add the $match stage to the pipeline
//     if (Object.keys(matchStage).length > 0) {
//       pipeline.push({ $match: matchStage });
//     }

//     console.log("match ",matchStage)
//     console.log("pipeline ",pipeline)

//     // Execute the aggregation pipeline
//     const colleges = await College.aggregate(pipeline);

//     // Return the matching colleges
//     res.json(colleges);
//   } catch (error) {
//     // Handle error
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
