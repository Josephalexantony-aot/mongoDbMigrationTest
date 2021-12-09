
const  {clientConnection,sourceConnection} = require('../dbConnection');
const AttendeeScheema = require('./sourceModels/attendee')
const emailScheema = require('./sourceModels/emails')
const invitationScheema = require('./sourceModels/invitation')
const paymentScheema = require('./sourceModels/payment')
const paymentAuditScheema = require('./sourceModels/paymentAudit')
const eventScheema = require('./sourceModels/event')
const eventActivityScheema = require('./sourceModels/eventActivities')
const eventMigrationScheema = require('./sourceModels/migrationMetaData')

const testAttendeeScheema = require('./sourceModels/testAttendee')
const testEmailScheema = require('./sourceModels/testEmail')
const testPaymentScheema = require('./sourceModels/testPayment')
const testPaymentAuditScheema = require('./sourceModels/testPaymentAudit')
const testEventActivityScheema = require('./sourceModels/testEventActivity')
const clientEventActivityScheema = require('./sourceModels/eventActivities')
const testInvitationScheema = require('./sourceModels/testInvitation')
const testEventIdScheema = require('./sourceModels/testEventId')



const clientEventActivity = clientConnection.model('eventActivity', clientEventActivityScheema);
const sourceEvent = sourceConnection.model('event', eventScheema);

const clientAttendee = clientConnection.model('Attendee', AttendeeScheema);
const sourceAttendee = sourceConnection.model('Attendee', AttendeeScheema);

const clientEmail = clientConnection.model('Email', emailScheema);
const sourceEmail = sourceConnection.model('Email', emailScheema);

const clientInvitation = clientConnection.model('Invitation', invitationScheema);
const sourceInvitation = sourceConnection.model('Invitation', invitationScheema);

const clientPayment = clientConnection.model('Payment', paymentScheema);
const sourcePayment = sourceConnection.model('Payment', paymentScheema);

const clientPaymentAudit = clientConnection.model('PaymentAudit', paymentAuditScheema);
const sourcePaymentAudit = sourceConnection.model('PaymentAudit', paymentAuditScheema);

const sourceEventActivity = sourceConnection.model('eventActivity', eventActivityScheema);

const eventMigraion = clientConnection.model('eventMigration', eventMigrationScheema);

//testSchemas

const sourceTestAttendee = sourceConnection.model('testAttendee', testAttendeeScheema);
const sourceTestEmail = sourceConnection.model('testEmail', testEmailScheema);
const sourceTestPayment = sourceConnection.model('testPayment', testPaymentScheema);
const sourceTestPaymentAudit = sourceConnection.model('testPaymentAudit', testPaymentAuditScheema);
const sourceTestEventActivity = sourceConnection.model('testEventActivity', testEventActivityScheema);
const sourceTestInvitation = sourceConnection.model('testInvitation', testInvitationScheema);
const testEventId = sourceConnection.model('testEventId', testEventIdScheema);

module.exports = {
        sourceEvent, eventMigraion,sourceTestEmail,sourceTestAttendee, sourceTestPayment,
        sourceTestPaymentAudit, sourceTestEventActivity,sourceTestInvitation,
        clientAttendee, clientEmail, clientInvitation,
        clientPayment, clientPaymentAudit, clientEventActivity,
        sourcePaymentAudit, sourceAttendee, sourceEventActivity,
        sourceEmail,sourcePayment,sourceEvent,testEventId
};   