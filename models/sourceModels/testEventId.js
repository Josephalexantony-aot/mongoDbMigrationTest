const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const  {sourceConnection} = require('../../dbConnection');
const testEventIdSchema = Schema({
           
    "eventId": String,
    "isArchieved": Boolean
    
       
},{collection : 'testEventId'})
 
// const Invitation = sourceConnection.model('Invitation', invitationSchema);
// module.exports = Invitation;
// module.exports = mongoose.model('Invitation', invitationSchema)
module.exports = testEventIdSchema;