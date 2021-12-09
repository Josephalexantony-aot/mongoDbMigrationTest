
const {sourceInvitation} = require('../../models/modelDbConnection')

exports.fetchInvitationDetails = async (req, res) => {
    try {
        data = await sourceInvitation.find({eventId :{$in:[
            ("5d012161e4b07c071575a7d1"),
            ("5ccfe4717de067e39b6f135d"),
      
        ]}})
        if(data)
        pushArrayOfDataToDb(data, "pushInvitaionObjects");
        res.send(data)
    } catch (error) {
        res.send('errorrr' + error)
    }

}

exports.fetchInvitationDetailsById = async (req, res) => {
    try {
        const data = await sourceInvitation.findById(req.params.id)
        if (data) {
            pushSingleDataToDb(data, "TEST_INVITATION");
            res.json(data)
        }
    } catch (error) {
        res.send('error' + error)
    }

}

exports.pushInvitationDetails = async (req, res) => {
    const invitation = req.body
    var invitationDetails = new Invitation(invitation)
    console.log(invitationDetails)

    try {
        const a1 = await invitationDetails.save()
        res.json(a1)
    } catch (error) {
        res.send("error" + error)
    }
}

