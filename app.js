// DEPENDENCIES
const cors = require('cors')
const express = require('express')
const cloudinary = require('cloudinary').v2;

const authController = require('./controllers/authController')

// CONFIGURATION
const app = express()

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MIDDLEWARE
app.use(cors())

// const multer = require('multer'); // used for file uploads
// const upload = multer(); // In-memory storage for file uploads

app.use((req, _res, next) => {
  console.log('Origin Requested:', req.headers.origin)
  next()
})

app.use(express.json())

app.use('/api/auth', authController)

// ROUTES
app.get('/', (_req, res) => {
  res.send('Welcome to Firebase Backend Server')
})



// 404 PAGE
app.get('*', (_req, res) => {
  res.status(404).send('Page not found')
})

// Route to upload an image to Cloudinary
// app.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     const result = await cloudinary.uploader.upload(req.file.buffer, {
//       folder: 'memorial-images', // specify the folder in Cloudinary
//     });
//     res.json(result); // Send back the URL or result of the upload
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Error uploading image');
//   }
// });

// EXPORT
module.exports = app
