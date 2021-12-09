


const { sourceEvent, eventMigraion, sourceTestEmail, sourceTestAttendee, sourceTestPayment,
    sourceTestPaymentAudit, sourceTestEventActivity, sourceTestInvitation,
    clientAttendee, clientEmail, clientInvitation,
    clientPayment, clientPaymentAudit, clientEventActivity,
    sourcePaymentAudit, sourceAttendee, sourceEventActivity,
    sourceEmail, sourcePayment
} = require('../models/modelDbConnection')



/////////////////////////////////FETCH DETAILS USING EVENT ID/////////////////////////////////////
eventCount = 0;
initMigrationDetails = async (id) => {
    const eventId = id;
    starTime = new Date();

    try {
        const sourceAttendeeCount = await sourceAttendee.count({ eventId: { $eq: eventId } })
        const sourceEmailCount = await sourceEmail.count({ eventid: { $eq: eventId } })
        const sourcePaymentCount = await sourcePayment.count({ eventId: { $eq: eventId } })
        const sourcePaymentAuditCount = await sourcePaymentAudit.count({ eventId: { $eq: eventId } })
        const sourceEventActivityCount = await sourceEventActivity.count({ eventId: { $eq: eventId } })
        items = {
            eventId: eventId,
            startTime: starTime,
            endTime: null,
            isCompleted: false,
            attendee: {
                count: sourceAttendeeCount,
                isCompleted: false
            },
            emails: {
                count: sourceEmailCount,
                isCompleted: false
            },
            payment: {
                count: sourcePaymentCount,
                isCompleted: false
            },
            paymentAudit: {
                count: sourcePaymentAuditCount,
                isCompleted: false
            },
            eventActivity: {
                count: sourceEventActivityCount,
                isCompleted: false
            }
        }

        pushMigrationDetails(items)
        fetchAndPushAttendee(eventId);
      
    } catch (error) {
        console.log("error" + error)
    }

}
///////////////////////ATTENDEE////////////////////////////
fetchAndPushAttendee = async (eventId) => {
    do {

        data = await sourceTestAttendee.find({ eventId: { $eq: eventId } }).limit(100)
        insert = await pushArrayOfDataToDb(data, "ATTENDEE")
        attendeeIds = []
        data.forEach(attendee => {
            attendeeIds.push(attendee.id)
        })

        var deleted = await sourceTestAttendee.deleteMany({ _id: { $in: attendeeIds } })
        console.log(deleted)
        dCount = deleted.deletedCount;
        console.log(dCount)

    } while (dCount != 0)

        var updateIscompleatd = await eventMigraion.updateOne({
            eventId: eventId
        }, {
            $set: { "attendee.isCompleted": "true" }
        })

    if (updateIscompleatd.acknowledged == true) {
        console.log("==================================ATTENDEE COMPLETED==============================================")
        
        fetchAndPushEmails(eventId)
    } else
        console.log("????????????FAILD ATTENDEE?????????????")
}



////////////////////////////////EMAILS///////////////////////////////////

fetchAndPushEmails = async (eventId) => {
    do {

        data = await sourceTestEmail.find({ eventid: { $eq: eventId } }).limit(100)
        insert = await pushArrayOfDataToDb(data, "EMAIL")
        emailsIds = []
        data.forEach(email => {
            emailsIds.push(email.id)
        })

        var deleted = await sourceTestEmail.deleteMany({ _id: { $in: emailsIds } })
        dCount = deleted.deletedCount;
        console.log(dCount)

    } while (dCount != 0)
    var updateIscompleatd = await eventMigraion.updateOne({
        eventId: eventId
    }, {
        $set: { "emails.isCompleted": "true" }
    })
    if (updateIscompleatd.acknowledged == true) {
        console.log("===================================EMAIL COMPLETED=============================================")
        fetchAndPushPayment(eventId)
    }
    else
        console.log("????????????FAILD EMAILS?????????????")

    

}

////////////////////////////////PAYMENTS///////////////////////////////////

fetchAndPushPayment = async (eventId) => {
    do {

        data = await sourceTestPayment.find({ eventId: { $eq: eventId } }).limit(100)
        insert = await pushArrayOfDataToDb(data, "PAYMENT")
        paymentIds = []
        data.forEach(payment => {
            paymentIds.push(payment.id)
        })

        var deleted = await sourceTestPayment.deleteMany({ _id: { $in: paymentIds } })
        dCount = deleted.deletedCount;
        console.log(dCount)

    } while (dCount != 0)
    var updateIscompleatd = await eventMigraion.updateOne({
        eventId: eventId
    }, {
        $set: { "payment.isCompleted": "true" }
    })
    console.log(updateIscompleatd)
    if (updateIscompleatd.acknowledged == true) {
        console.log("================================PAYMENT COMPLETED================================================")
        fetchAndPushPaymentAudit(eventId)
    }
    else
        console.log("????????????FAILD PAYMENT?????????????")
}
////////////////////////////////PAYMENT AUDIT///////////////////////////////////

fetchAndPushPaymentAudit = async (eventId) => {
    do {

        data = await sourceTestPaymentAudit.find({ eventId: { $eq: eventId } }).limit(100)
        insert = await pushArrayOfDataToDb(data, "PAYMENT_AUDIT")
        paymentIds = []
        paymentAuditIds = []
        data.forEach(paymentAudit => {
            paymentAuditIds.push(paymentAudit.id)
        })
        var deleted = await sourceTestPaymentAudit.deleteMany({ _id: { $in: paymentAuditIds } })
        dCount = deleted.deletedCount;
        console.log(dCount)

    } while (dCount != 0)
    var updateIscompleatd = await eventMigraion.updateOne({
        eventId: eventId
    }, {
        $set: { "paymentAudit.isCompleted": "true" }
    })

    if (updateIscompleatd.acknowledged == true) {
        console.log("=====================================PAYMENT AUDIT COMPLETED===========================================")
        fetchAndPushEventActivity(eventId)
    }
    else
        console.log("????????????FAILD PAYMENT AUDIT?????????????")
}

////////////////////////////////EventActivity///////////////////////////////////

fetchAndPushEventActivity = async (eventId) => {

    do {

        data = await sourceTestEventActivity.find({ eventId: { $eq: eventId } }).limit(100)
        insert = await pushArrayOfDataToDb(data, "EVENT_ACTIVITY")
        eventActivityIds = []
        data.forEach(eventActivity => {
            eventActivityIds.push(eventActivity.id)
        })
        var deleted = await sourceTestEventActivity.deleteMany({ _id: { $in: eventActivityIds } })
        dCount = deleted.deletedCount;
        console.log(dCount)

    } while (dCount != 0)

    if(dCount == 0){
        var updateIscompleatd = await eventMigraion.updateOne({
            eventId: eventId
        }, {
            $set: { "eventActivity.isCompleted": "true" }
        })
    }
    console.log(updateIscompleatd)
    if (updateIscompleatd.acknowledged == true) {
        console.log("=====================================EVENT ACTIVITY COMPLETED===========================================")
        endTime = new Date();

        var updateCommonIscompleatd = await eventMigraion.updateOne({
            eventId: eventId
        }, {
            $set: { "isCompleted": "true", "endTime" : endTime, "isArchived": "true"  }
        })
    }
    else
        console.log("???????????? FAILD PAYMENT AUDIT ?????????????")



    // var updateIsArchived = await sourceEvent.aggregate( [
    //     { $match: { _id: eventId } },
    //     {
    //       $addFields: { "isArchived": "true" }
    //     }
    //   ] )
    //   sourceEvent.updateOne({
    //     eventId: eventId
    // }, {
    //     $set: { "isArchived": "true"  }
    // })
    var updateIsArchived = await sourceEvent.updateOne({_id: eventId}, {$set: {"isArchived": "true"}})

    
    
//     ([
//    { $match: { _id: eventId } },
//    { $addFields: { "isArchived": "true"} }])
 //
   
   console.log(updateIsArchived)
       // console.log(isArch)
        console.log("MIGRATION COMPLETED FOR EVENT ID =-----------> : " + eventId)
        eventCount += 1;
        console.log("===========================EventCount ="+ eventCount+"================================")
        console.log("===========================EventCount ="+ eventCount+"================================")
             //update isArchived True in Source Db.
        if (updateIsArchived.acknowledged == true) {
                console.log("updateCommonIscompleatd.acknowledged == true; MOVING TO NEXT")
                       fetchEventData();
                }
}

////////////////////////////MIGRATION DETAILS/////////////////////////////

pushMigrationDetails = async (items) => {
    var details = new eventMigraion(items)
    console.log(details)
    const a1 = await details.save()
    console.log("migration details saved")
}



//////////////////////PUSH DATA TO DESTINATION DB//////////////////////////
pushArrayOfDataToDb = async (Datas, modelName) => {

    if (modelName == 'PAYMENTAUDIT') {

        Datas.forEach(Data => {
            let item = Data.toJSON();
            //console.log("Items:" + item)
            let details = new clientPaymentAudit(item)
            const a1 = details.save()
            console.log("details saved:" + a1)
        })
    } else if (modelName == 'PAYMENT') {
        Datas.forEach(Data => {
            let item = Data.toJSON();
            //console.log("Items:" + item)
            let details = new clientPayment(item)
            const a1 = details.save()
            console.log("details saved:" + a1)
        })
    } else if (modelName == 'INVITATION') {
        Datas.forEach(Data => {
            let item = Data.toJSON();
            //console.log("Items:" + item)
            let details = new clientInvitation(item)
            const a1 = details.save()
            console.log("details saved:" + a1)
        })
    } else if (modelName == 'ATTENDEE') {
        Datas.forEach(attendeeData => {
            let item = attendeeData.toJSON();
            //console.log("Items:" + item)
            let details = new clientAttendee(item)
            const a1 = details.save()
            console.log("attendee details saved:" + a1)
        })
    } else if (modelName == 'EMAIL') {
        Datas.forEach(emailData => {
            let item = emailData.toJSON();
            //console.log("Items:" + item)
            let details = new clientEmail(item)
            const a1 = details.save()
            console.log("Email details saved::::" + a1)
        })
    } else if (modelName == 'EVENT_ACTIVITY') {

        Datas.forEach(eventData => {
            let item = eventData.toJSON();
            //console.log("Items:" + item)
            let details = new clientEventActivity(item)
            const a1 = details.save()
            console.log("Event details saved::::" + a1)
        })
        var sendEventId = []
        Datas.forEach(DATA => {
            var ids = DATA._id;
            sendEventId.push(ids)
        })
        //    fetchAndSavePaymentAuditDetails(sendEventId);
        //    fetchAndSaveAttendeeDetails(sendEventId);
        //    fetchAndSaveEmailDetails(sendEventId);
        //    fetchAndSavePaymentDetails(sendEventId);

    } else if (modelName == 'TEST_ATTENDEE') {
        Datas.forEach(attendeeData => {
            let item = attendeeData.toJSON();
            //console.log("Items:" + item)
            let details = new sourceTestAttendee(item)
            const a1 = details.save()
            console.log("attendee details saved:" + a1)
        })
    } else if (modelName == 'TEST_EMAIL') {
        Datas.forEach(emailData => {
            let item = emailData.toJSON();
            //console.log("Items:" + item)
            let details = new sourceTestEmail(item)
            const a1 = details.save()
            console.log("Email details saved::::" + a1)
        })
    } else if (modelName == 'TEST_PAYMENT') {
        Datas.forEach(Data => {
            let item = Data.toJSON();
            //console.log("Items:" + item)
            let details = new sourceTestPayment(item)
            const a1 = details.save()
            console.log("details saved:" + a1)
        })
    } else if (modelName == 'TEST_PAYMENTAUDIT') {

        Datas.forEach(Data => {
            let item = Data.toJSON();
            //console.log("Items:" + item)
            let details = new sourceTestPaymentAudit(item)
            const a1 = details.save()
            console.log("details saved:" + a1)
        })
    } else if (modelName == 'TEST_INVITATION') {

        Datas.forEach(Data => {
            let item = Data.toJSON();
            //console.log("Items:" + item)
            let details = new sourceTestInvitation(item)
            const a1 = details.save()
            console.log("details saved:" + a1)
        })
    } else if (modelName == 'TEST_EVENT_ACTIVITY') {

        Datas.forEach(Data => {
            let item = Data.toJSON();
            //console.log("Items:" + item)
            let details = new sourceTestEventActivity(item)
            const a1 = details.save()
            console.log("details saved:" + a1)
        })
    }
}

fetchEventData = async () => {
    try {
        var date = "2019-07-01T05:48:32.522Z"
        data = await sourceEvent.find({ dateOfCreation: { $lte: date }, isArchived:{$ne: true}   }).limit(1)
        var eventIds = []
        if(data){
            data.forEach(id =>{
                eventIds.push(id._id)
            })
            eventIds.forEach(eventId =>{            
                console.log(eventId)
                let id = eventId
                console.log(id)
            initMigrationDetails(id)
    
            })
        }else{
            const eventCount = await sourceEvent.count({ dateOfCreation: { $lte: date }})
            console.log("Total Number of Events: "+eventCount)
            console.log("..MIGRATION COMPLETED..")
            
        }
       
    } catch (error) {
       console.log('errorrr' + error)
    }
}







