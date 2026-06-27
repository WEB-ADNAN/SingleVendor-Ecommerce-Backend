require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

//Middelwares
app.use(express.json())
app.use(cors())

//routes
app.get('/', (req,res)=>{
    res.send({message: "hello guys"})
})

//port
app.listen(5000, ()=>{
    console.log('server is running on port 5000')
})