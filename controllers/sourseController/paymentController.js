const {sourcePayment} = require('../../models/modelDbConnection')

const express = require('express')
const router = express.Router()


exports.fetchPaymentDetails =  async (req, res) => {
    try {
        data = await sourcePayment.find({eventId :{$in:[
            ("5d012161e4b07c071575a7d1"),
            ("5ccfe4717de067e39b6f135d"),
     
        ]}})
        pushArrayOfDataToDb(data, "TEST_PAYMENT");
        res.json(data)
    } catch (error) {
        res.send('errorrr' + error)
    }
    
}

exports.pushPaymentDetails = async (req, res) => {
    const payment = req.body
    var paymentDetails = new Payment(payment)
    console.log(paymentDetails)
    
    try{
        const a1 = await paymentDetails.save()
        res.json(a1)
    }catch(error){
        res.send("error" +error)
    }
}

exports.fetchPaymentDetailsById = async (req, res) => {
    try {
        const data = await sourcePayment.findById(req.params.id)
        if (data) {
            pushSingleDataToDb(data, "clientPayment");
            res.json(data)
        }
    } catch (error) {
        res.send('error' + error)
    }
    
}