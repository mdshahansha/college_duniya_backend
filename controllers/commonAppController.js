import College from '../models/college.schema.js';

// export const multipleFilter = async (req, res) => {
//     try {
//       // Construct query object dynamically based on request parameters
//       const query = {};
//       console.log(req.query)
  
    
//         // const colleges = await College.find({ courses: {$in:['Btech' ,'MTech']}});
//         const queryConditions = [];

//         // Add criteria for scholarship
//         // if (req.query.stream) {
//         //     queryConditions.push({ 'commonApplication.stream': { $in: req.query.stream.split(',') } });
//         // }

//         // if (req.query.level) {
//         //     queryConditions.push({ 'commonApplication.level': { $in: req.query.level.split(',') } });
//         // }
//         // if (req.query.degreeType) {
//         //     queryConditions.push({ 'commonApplication.degreeType': { $in: req.query.degreeType.split(',') } });
//         // }
//         // if (req.query.feeRange) {
//         //     queryConditions.push({ 'commonApplication.feeRange': { $in: req.query.feeRange } });

//         // } 

//         // if (req.query.feeRange) {
//         //     const targetFee = parseInt(req.query.feeRange); // Convert the query fee to a number
        
//         //     // Add condition to filter colleges where the target fee falls within the range
//         //     queryConditions.push({
//         //         $and: [
//         //             { 'commonApplication.feeRange.0': { $lte: targetFee } }, // Check if target fee is greater than or equal to the minimum fee
//         //             { 'commonApplication.feeRange.1': { $gte: targetFee } }  // Check if target fee is less than or equal to the maximum fee
//         //         ]
//         //     });
//         // }

//         // Add criteria for location
// //         if (req.query.city) {
// //             queryConditions.push({ 'location.city': req.query.city });
// //         }
 
// //     console.log("#_ ",queryConditions);
// // const finalQuery = { $and: [...queryConditions, { courses: { $in: req.query.courses.split(',') } }] };

//   const finalQuery = { $and: [queryConditions] };

// //         // console.log("_ ",finalQuery);
// //         // console.log("_ ",finalQuery['$and']);

// //         // Execute the query
// //         // const colleges = await College.find({ 'location.city': 'Delhi' });

//         // const colleges = await College.find(queryConditions);
//         const minFee = parseInt(req.query.feeRange); // Convert string to integer

//          const colleges = await College.find({  
//             $and: [
//                 { 
//                     'commonApplication.stream': { 
//                         $in: ["engineering", "medical"] 
//                     }, 
//                     'commonApplication.level': { 
//                         $in: ["pg","ug"] 
//                     },
//                     'commonApplication.degreeType': { 
//                         $in: ["regular", "online"] 
//                     },
//                     // 'commonApplication.feeRange': { 
//                     //     $in: ["male", "female"] 
//                     // },
//                     'commonApplication.feeRange.0': { $lte: minFee }, // Check if minFee is greater than or equal to the minimum fee in the range
//                     'commonApplication.feeRange.1': { $gte: minFee } , // Check if minFee is less than or equal to the maximum fee in the range
            
                    
//                     'location.city': 'Mumbai',
//                 },
//                 { 
                    
//                         courses: { $in: ['Btech', 'MTech'] },
                       
//                 }
//             ]
//         });
      
        
//         // const colleges = await College.find({courses: {$in:['MTech','BTech']}})
//         res.json(colleges);
 
//     } catch (error) {
//       // Handle error
//       console.error(error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
  
//feeRange and course is not working 

export const multipleFilter = async (req, res) =>{
    const queryConditions = [];
 
    if (req.query.stream) {
        queryConditions.push({ 'commonApplication.stream': { $in: req.query.stream.split(',') } });
    }
    if (req.query.level) { 
        queryConditions.push({ 'commonApplication.level': { $in: req.query.level.split(',') } });
    }
    if (req.query.degreeType) {
        queryConditions.push({ 'commonApplication.degreeType': { $in: req.query.degreeType.split(',') } });
    }
    // if (req.query.courses) {//is not working 
    //     const courses = req.query.courses.split(','); // Split courses only if it exists
    //     queryConditions.push({ courses: { $in: courses } });
    // }
    
    //  if (req.query.feeRange) {//is not working
    //         const targetFee = parseInt(req.query.feeRange); // Convert the query fee to a number
        
    //         // Add condition to filter colleges where the target fee falls within the range
    //         queryConditions.push({
    //             $and: [
    //                 { 'commonApplication.feeRange.0': { $lte: targetFee } }, // Check if target fee is greater than or equal to the minimum fee
    //                 { 'commonApplication.feeRange.1': { $gte: targetFee } }  // Check if target fee is less than or equal to the maximum fee
    //             ]
    //         });
    //     }

    // Add criteria for location
    if (req.query.city) {
        queryConditions.push({ 'location.city': req.query.city });
    }
    const finalQuery = { $and: queryConditions };
    // console.log("++++    ", { $in: req.query.courses.split(',')})
    // const finalQuery = { $and: [...queryConditions, { courses: { $in: req.query.courses.split(',') } }] };


    // console.log("_ ",finalQuery);

    // console.log("_ ",finalQuery['$and']);

    // Execute the query
    const colleges = await College.find( finalQuery);
    // console.log('finalQ ',colleges)
    // Return the result
    res.json(colleges);
 }