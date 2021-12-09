const express = require('express')
const router = express.Router()
const {sourceEmail, sourceTestEmail} = require('../../models/modelDbConnection')




exports.fetchEmails = async (req, res) => {
    try {
        const data = await sourceEmail.find({eventid :{$in:[
            ("5d012161e4b07c071575a7d1"),
            ("5ccfe4717de067e39b6f135d"),
         
    
        ]}})
        if (data) {
           
            pushArrayOfDataToDb (data, "TEST_EMAIL");
            res.json(data)
           }
    } catch (error) {
        res.send('error' + error)
    }
    
}
exports.fetchEmailsById = async (req, res) => {
    try {
        const data = await sourceEmail.findById(req.params.id)
        if (data) {
           
            pushArrayOfDataToDb(data, "TEST_EMAIL");
            res.json(data)
           }
    } catch (error) {
        res.send('error' + error)
    }
    
}

exports.pushEmails = async (req, res) => {
    const email = req.body
    var emailDetails = new Emails(email)
    console.log(emailDetails)
    
    try{
        const a1 = await emailDetails.save()
        res.json(a1)
    }catch(error){
        res.send("error" +error)
    }
}