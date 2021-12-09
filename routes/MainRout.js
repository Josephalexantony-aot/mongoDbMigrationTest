const express = require('express')
const router = express.Router()

const Attendee = require('../models/sourceModels/attendee')
const Emails = require('../models/sourceModels/emails')
const Payment = require('../models/sourceModels/payment')
const Invitation = require('../models/sourceModels/invitation')
const paymentAudit = require('../models/sourceModels/paymentAudit')
const attendeeController = require('../controllers/sourseController/attendeeController')
const emailController = require('../controllers/sourseController/emailController')
const paymentController = require('../controllers/sourseController/paymentController')
const invitationController = require('../controllers/sourseController/invitationController')
const paymentAuditController = require('../controllers/sourseController/paymentAuditController')
const eventController = require('../controllers/sourseController/eventController')
const eventActivityController = require('../controllers/sourseController/eventActivityController')



router.get('/events', eventController.init)

//Attendee Collection api  == GET, GET/:ID, POST, PATCH, DELETE 
var data;
router.get('/attendee', attendeeController.fetchAttendeeData)
router.get('/attendee/:id', attendeeController.fetchAttendeeDataByid)
router.patch('/attendee/:id', attendeeController.updateAttendeeData )
router.delete('/attendee/:id', attendeeController.deleteAttendeeData)
router.post('/attendee/', attendeeController.PushAttendeeData)

//Emails API collection ==>GET, GET/:ID, POST

router.get('/emails', emailController.fetchEmails)
router.get('/emails/:id', emailController.fetchEmailsById )
router.post('/emails', emailController.pushEmails)

//Payment API Collection ==>GET, GET/:ID, POST
router.get('/payment', paymentController.fetchPaymentDetails)
router.get('/payment/:id', paymentController.fetchPaymentDetailsById)
router.post('/payment', paymentController.pushPaymentDetails)


//Invitation API collection  ==>GET, GET/:ID, POST
router.get('/invitations', invitationController.fetchInvitationDetails)
router.get('/invitations/:id', invitationController.fetchInvitationDetailsById)
router.post('/invitations', invitationController.pushInvitationDetails)

//paymentAudit API collection  ==>GET, GET/:ID, GET/FindByArrayOfIds, POST
router.get('/payment-audit', paymentAuditController.fetchPaymentAuditDetails)
router.get('/payment-audit/:id', paymentAuditController.fetchPaymentAuditDetailsById)
//router.get('/payment-audit-byIds', paymentAuditController.fetchPaymentAuditDetailsByIds)
router.post('/payment-audit', paymentAuditController.pushPaymentAuditDetails)
router.get('/payment-audit-num', paymentAuditController.fetchPaymentAuditCount)

router.get('/eventsActivity', eventActivityController.fetchEventActivityData)

module.exports = router


    