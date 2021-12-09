const { clientAttendee, clientEmail,eventMigraion, clientInvitation, clientPayment, clientPaymentAudit,clientEvent } = require('../models/modelDbConnection')

pushSingleDataToDb = async (attendeeData, modelName) => {
    console.log(attendeeData)
    var items = attendeeData.toJSON();
    console.log(items)
    console.log(modelName)
    if (modelName == 'clientAttendee') {
        var details = new clientAttendee(items)
        console.log(details)
        const a1 = await details.save()
        console.log("details saved" + a1)
    } else if (modelName == 'clientEmail') {
        var details = new clientEmail(items)
        console.log(details)
        const a1 = await details.save()
        console.log("details saved" + a1)
    } else if (modelName == 'clientInvitation') {
        var details = new clientInvitation(items)
        console.log(details)
        const a1 = await details.save()
        console.log("details saved" + a1)
    } else if (modelName == 'clientPayment') {
        var details = new clientPayment(items)
        console.log(details)
        const a1 = await details.save()
        console.log("details saved" + a1)
    } else if (modelName == 'clientPaymentAudit') {
        var details = new clientPaymentAudit(items)
        console.log(details)
        const a1 = await details.save()
        console.log("details saved" + a1)
    }else if (modelName == 'pushEventObjects') {
        var details = new clientEvent(items)
        console.log(details)
        const a1 = await details.save()
        console.log("details saved" + a1)
    }

}



module.exports = pushSingleDataToDb;




