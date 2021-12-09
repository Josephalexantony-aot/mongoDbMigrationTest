const {sourcePaymentAudit} = require('../../models/modelDbConnection')

exports.fetchPaymentAuditDetails =  async (req, res) => {
    try {
        data = await sourcePaymentAudit.find({eventId :{$in:[
            ("5d012161e4b07c071575a7d1"),
            ("5ccfe4717de067e39b6f135d"),
 
        ]}})
        pushArrayOfDataToDb(data, "TEST_PAYMENTAUDIT");
        res.json(data)
    } catch (error) {
        res.send('errorrr' + error)
    }
    
}

exports.fetchPaymentAuditDetailsById = async (req, res) => {
    try {
        const data = await sourcePaymentAudit.findById(req.params.id)
        if (data) {
            pushSingleDataToDb(data, "clientPaymentAudit");
            res.json(data)
        }
    } catch (error) {
        res.send('error' + error)
    }
    
}

exports.pushPaymentAuditDetails =  async (req, res) => {
    const paymentAudi = req.body;
    var payAudit = new paymentAudit(paymentAudi);
    console.log(payAudit)
    
    try{
        const a1 = await payAudit.save()
        res.json(a1)
    }catch(error){
        res.send("error" +error)
    }
}

exports.fetchPaymentAuditDetailsByIds = async (req, res) => {
    try {
        data = await sourcePaymentAudit.find({
            _id: { $in: [
            ('5ceb67f8e4b0c27a6719ac8d'),
            ('5ceb6805e4b0c27a6719ac8e')
         ]}})
         pushArrayOfDataToDb(data, "pushPaymentAuditobjects");
        res.json(data)
    } catch (error) {
        res.send('errorrr' + error)
    }
    
}

exports.fetchPaymentAuditCount = async (req, res) => {
    try {
         const cont = paymentAudit.count({}, function(err, count){
            console.log( "Number of docs: ", count );
            
        });
        // num = await paymentAudit.count();
        // res.sendStatus(num)
    } catch (error) {
        res.send('errorrr' + error)
    }
    
} 