const express = require('express')
const Payment = require('../Mongoose/Paymentgateway')
require('dotenv').config()
const Razorpay = require('razorpay')
const crypto = require("crypto");
const router = express.Router();
const razorpay = new Razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_SECRET,
})
router.get("/create",(req,res)=>{
    res.send("Hello Router")
})

router.post('/order',(req,res)=>{
  const {amount} = req.body;
console.log(amount)
try{

    let option ={
        amount:Number(amount*100),
        currency:"INR",
        receipt:crypto.randomBytes(10).toString('hex')
    };
    razorpay.orders.create(option,(err,order)=>{
        if(err){
            console.log(err)
            return res.status(500).json({ message: "Something Went Wrong!" });
        }
      console.log(order)
      res.send(order)
    })
}catch(err){
    console.log(e)
}
})

router.post('/verify', async (req,res)=>{
    const {razorpay_order_id,razorpay_payment_id,razorpay_signature,ParentName,ChildName,Phone,ParentEmail,CourseName,Amount} = req.body
    try{
         const sign = razorpay_order_id + "|" + razorpay_payment_id;
         const expectedSign = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
         .update(sign.toString())
         .digest("hex");
         const isAuthentic = expectedSign === razorpay_signature;
         if(isAuthentic){
            const payment = new Payment({
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
              ParentName,
              ChildName,
              Phone,
              ParentEmail,
              CourseName,
              Amount
            });
            await payment.save();
            res.json({
                message:"Payment Sucessfull"
            });
         }
    }catch(err){
        res.status(500).json({message:"Internal Error"})
        console.log(err)
    }
})

router.post('/refund',async(req,res)=>{
    const {payment_id,amount} = req.body;
    console.log(payment_id," " ,amount)
    try{
        const options = {
            payment_id,
            amount
        };
        const response = await razorpay.refunds(options)
        
        res.send("Payment Sucessfull") 
        
    }catch(e){
        //  console.log(e)
         res.status(400).send('unable to issue a refund' , );
    }
})


module.exports = router;