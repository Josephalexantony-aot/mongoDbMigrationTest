const express = require('express')
const router = express.Router()
const {clientAttendee,sourceAttendee, clientEmail} = require("../models/modelDbConnection")
//const Attendee = require('../models/clientModels/attendee')
const Emails = require('../models/sourceModels/emails')
const Payment = require('../models/sourceModels/payment')
const Invitation = require('../models/sourceModels/invitation')
const paymentAudit = require('../models/sourceModels/paymentAudit')
const pushSingleData = require('../services/insertSingleDataService')
const pushArrayOfData = require('../services/insertArrayOfObjectService')
 


//Attendee Collection api  == GET, GET/:ID, POST, PATCH, DELETE 


router.get('/attendee', async (req, res) => {
    try {
        data = await clientAttendee.find()
        // pushDataToDb(data);
        res.json(data)
    } catch (error) {
        res.send('errorrr' + error)
    }
    
})

router.get('/attendee/:id', async (req, res) => {
    try {
        const data = await Attendee.findById(req.params.id)
        res.send(data)
        pushDataToDb(data);
    } catch (error) {
        res.send('error' + error)
    }
    
})

router.patch('/attendee/:id', async (req, res) => {
    try {
        const data = await Attendee.findById(req.params.id)
        data.sub = req.body.sub;
        const a2 = await data.save()
        res.json(data)
    } catch (error) {
        res.send('errorrr' + error)
    }
    
})
router.delete('/attendee/:id', async(req, res) =>{
    const data = await Attendee.findById(req.params.id)
    try {
        await data.delete(data)
        res.send("deleted")
    }catch (error){
        res.send("error:" + error)
    }
   
})

router.post('/attendee/', async (req, res) => {
    const dat = req.body
    var AttendeeDetails = new Attendee(dat)
    console.log(AttendeeDetails)
    
    try{
        const a1 = await AttendeeDetails.save()
        res.json(a1)
    }catch(error){
        res.send("error" +error)
    }
})

//Emails API collection ==>GET, GET/:ID, POST
router.get('/emails', async (req, res) => {
    var date = "2019-07-01T05:48:32.522Z"
    try {
        data = await clientEmail.find({ dateOfCreation: { $gt: date } })
        res.json(data)
    } catch (error) {
        res.send('errorrr' + error)
    }
    
})

router.get('/emails/:id', async (req, res) => {
    try {
        const data = await Emails.findById(req.params.id)
        res.send(data)
    } catch (error) {
        res.send('error' + error)
    }
    
})

router.post('/emails', async (req, res) => {
    const email = req.body
    var emailDetails = new Emails(email)
    console.log(emailDetails)
    
    try{
        const a1 = await emailDetails.save()
        res.json(a1)
    }catch(error){
        res.send("error" +error)
    }
})

//Payment API Collection ==>GET, GET/:ID, POST
router.get('/payment', async (req, res) => {
    try {
        data = await Payment.find()
        res.json(data)
    } catch (error) {
        res.send('errorrr' + error)
    }
    
})

router.get('/payment/:id', async (req, res) => {
    try {
        const data = await Payment.findById(req.params.id)
        res.send(data)
    } catch (error) {
        res.send('error' + error)
    }
    
})

router.post('/payment', async (req, res) => {
    const payment = req.body
    var paymentDetails = new Payment(payment)
    console.log(paymentDetails)
    
    try{
        const a1 = await paymentDetails.save()
        res.json(a1)
    }catch(error){
        res.send("error" +error)
    }
})


//Invitation API collection  ==>GET, GET/:ID, POST
router.get('/invitations', async (req, res) => {
    try {
        data = await Invitation.find()
        res.json(data)
    } catch (error) {
        res.send('errorrr' + error)
    }
    
})

router.get('/invitations/:id', async (req, res) => {
    try {
        const data = await Invitation.findById(req.params.id)
        res.send(data)
    } catch (error) {
        res.send('error' + error)
    }
    
})

router.post('/invitations', async (req, res) => {
    const  invitation= req.body
    var invitationDetails = new Invitation(invitation)
    console.log(invitationDetails)
    
    try{
        const a1 = await invitationDetails.save()
        res.json(a1)
    }catch(error){
        res.send("error" +error)
    }
})

//paymentAudit API collection  ==>GET, GET/:ID, GET/FindByArrayOfIds, POST
router.get('/payment-audit', async (req, res) => {
    try {
        data = await paymentAudit.find()
        res.json(data)
    } catch (error) {
        res.send('errorrr' + error)
    }
    
})



router.get('/payment-audit/:id', async (req, res) => {
    try {
        const data = await paymentAudit.findById()
        res.send(data)
    } catch (error) {
        res.send('error' + error)
    }
    
})
router.get('/payment-audit-byIds', async (req, res) => {
    try {
        data = await paymentAudit.find({
            _id: { $in: [
            ('5cd510987de0a23a6554750c'),
            ('5ceb9f8be4b02ac240678c93')
         ]}})
        res.json(data)
    } catch (error) {
        res.send('errorrr' + error)
    }
    
})

router.post('/payment-audit', async (req, res) => {
    const paymentAudi = req.body;
    var payAudit = new paymentAudit(paymentAudi);
    console.log(payAudit)
    
    try{
        const a1 = await payAudit.save()
        res.json(a1)
    }catch(error){
        res.send("error" +error)
    }
})

router.get('/payment-audit-num', async (req, res) => {
    try {
         const cont = paymentAudit.count({}, function(err, count){
            console.log( "Number of docs: ", count );
            
        });
        // num = await paymentAudit.count();
        // res.sendStatus(num)
    } catch (error) {
        res.send('errorrr' + error)
    }
    
})


module.exports = router


