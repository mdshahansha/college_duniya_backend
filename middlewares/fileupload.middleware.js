// 1. Import multer.
import multer from 'multer';
 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString() + file.originalname
    );
  },
});

export const upload = multer({
  storage: storage,
}).array('images', 10); 

// 'images' is the field name for the images in the form, and 10 is the maximum number of files allowed.
 




// productRouter.post(
//   '/',
//   upload,
//   (req, res) => {
//     productController.addProduct(req, res);
//   }
// );
// import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       new Date().toISOString() + file.originalname
//     );
//   },
// });

// // Configure multer for multiple file upload
// export const upload = multer({
//   storage: storage,
// }).array('images', 10); // 'images' is the field name for the images in the form, and 10 is the maximum number of files allowed.

// // Example route where you handle the file upload
// app.post('/upload', (req, res) => {
//   upload(req, res, (err) => {
//     if (err) {
//       // Handle multer error
//       console.error(err);
//       return res.status(500).json({ error: err.message });
//     }
    
//     // Files uploaded successfully
//     return res.status(200).json({ message: 'Files uploaded successfully' });
//   });
// });


