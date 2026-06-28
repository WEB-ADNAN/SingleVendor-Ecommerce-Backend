require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const mongodbConnection = require('./config/mongodbConnection')
const registrationController = require('./controller/registrationController')

mongodbConnection()

//Middelwares
app.use(express.json())
app.use(cors())

//routes
app.post('/registration', registrationController)

//port
const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log('server is running on port 5000')
})