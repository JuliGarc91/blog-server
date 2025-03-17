// DEPENDENCIES
const cors = require('cors')
const express = require('express')

const authController = require('./controllers/authController')

// CONFIGURATION
const app = express()

// MIDDLEWARE
app.use(cors())

const multer = require('multer'); // used for file uploads
const upload = multer(); // In-memory storage for file uploads

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

// EXPORT
module.exports = app
