require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const mongodbConnection = require('./config/mongodbConnection')
const { registrationController, verifyEmailController, loginController, forgotPasswordController, resetPasswordController, reverificationController } = require('./controller/authController')

//Mongodb connection
mongodbConnection()

//Middelwares
app.use(express.json())
app.use(cors())

//routes
app.post('/registration', registrationController)

app.post('/verifyemail/:token', verifyEmailController)

app.post('/Login', loginController)

app.post('/forgotPassword', forgotPasswordController)

app.post('/resetPassword/:token', resetPasswordController)

app.post('/reverification', reverificationController)

//port
const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log('server is running on port 5000')
})