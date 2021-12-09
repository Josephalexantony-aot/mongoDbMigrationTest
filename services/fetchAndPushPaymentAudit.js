const { clientAttendee, clientEmail, clientInvitation, clientPayment, sourcePaymentAudit, clientEvent } = require('../models/attendees')

fetchPaymentAuditDetailsByIdss = (data) => {
    // try {
    //     data =  sourcePaymentAudit.find({
    //         _id: {
    //             $in: [
    //                eventIds
    //             ]
    //         }
    //     })
    //     pushArrayOfDataToDb(data, "pushPaymentAuditobjects");
    //     res.json(data)
    // } catch (error) {
    //     res.send('errorrr' + error)
    // }
       data.forEach(D => {
                 eventId = D._id
                 console.log("event idsss:::::::  " +eventId)
            })
            var details = new clientInvitation(items)
            console.log(details)
            const a1 = await details.save()

}


module.exports = fetchPaymentAuditDetailsByIdss;