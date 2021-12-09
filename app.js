const express = require('express')
const mongoose = require('mongoose')
//const fetchbyEventId = require('../views/fetchbyEventId')


const app = express()
app.use(express.json())

const ResourseRouter = require('./routes/MainRout')
const clientRoueter   = require('./routes/ClientRout')
app.use('/client', clientRoueter)
app.use('/Resourse', ResourseRouter)

    
app.listen(9000, ()=>{
    console.log("server started..");
})


