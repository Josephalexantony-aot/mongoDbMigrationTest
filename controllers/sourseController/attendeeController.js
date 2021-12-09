const express = require('express')
const router = express.Router()
const { attendeeFetch, PushAttendee } = require('../../connectSchema/connectAttendeeSchema')
const clientRout = require('../../routes/ClientRout')
const Attendee = require('../../models/sourceModels/attendee')
const pushAttendee = require('../../models/sourceModels/attendee')
const {clientAttendee,sourceAttendee} = require('../../models/modelDbConnection')
const AttendeeScheema = require('../../models/sourceModels/attendee')
const pushArrayOfData = require('../../services/insertArrayOfObjectService') 












exports.fetchAttendeeDataByid = async (req, res) => {

    try {
        const data = await sourceAttendee.findById(req.params.id)    //fetch attendee detail from yepdes 625 db
        
        if (data) {
           
            pushSingleDataToDb(data, "clientAttendee");
            res.json(data)
           }

        
    } catch (error) {
        res.send('error' + error)
    }

}

exports.fetchAttendeeData = async (req, res) => {
    try {
        data = await sourceAttendee.find({eventId :{$in:[
            ("5d012161e4b07c071575a7d1"),
            ("5ccfe4717de067e39b6f135d"),
           
    
        ]}})
        pushArrayOfDataToDb(data, "TEST_ATTENDEE");
        res.json(data)
    } catch (error) {
        res.send('errorrr' + error)
    }

}

exports.updateAttendeeData = async (req, res) => {
    try {
        const data = await Attendee.findById(req.params.id)
        data.sub = req.body.sub;
        const a2 = await data.save()
        res.json(data)
    } catch (error) {
        res.send('errorrr' + error)
    }

}

exports.deleteAttendeeData = async (req, res) => {
    const data = await Attendee.findById(req.params.id)
    try {
        await data.delete(data)
        res.send("deleted")
    } catch (error) {
        res.send("error:" + error)
    }

}

exports.PushAttendeeData = async (req, res) => {
    const dat = req.body
    var AttendeeDetails = new Attendee(dat)
    console.log(AttendeeDetails)

    try {
        const a1 = await AttendeeDetails.save()
        res.json(a1)
    } catch (error) {
        res.send("error" + error)
    }
}


