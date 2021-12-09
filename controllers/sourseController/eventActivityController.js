const { sourceEventActivity } = require('../../models/modelDbConnection')
const express = require('express')
const router = express.Router()


exports.fetchEventActivityData = async (req, res) => {
    try {
            data = await sourceEventActivity.find({eventId :{$in:[
                ("5d012161e4b07c071575a7d1"),
                ("5ccfe4717de067e39b6f135d"),
   
        
            ]}})
            if (data) {
           
                pushArrayOfDataToDb (data, "TEST_EVENT_ACTIVITY");
                res.json(data)
               }
        } catch (error) {
            res.send('error' + error)
        }

}