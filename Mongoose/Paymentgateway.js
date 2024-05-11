const mongoose = require('mongoose')

const Productschema = new mongoose.Schema({
     razorpay_order_id:{
        type:String,
        required:true
    },
    razorpay_payment_id:{
        type:String,
        required:true
    },
   razorpay_signature:{
    type:String,
    required:true
   },
   ParentName:{
    type:String,
    required:true
   },
   ChildName:{
    type:String,
    required:true
   },
   Phone:{
    type:String,
    required:true
   },
   ParentEmail:{
    type:String,
    required:true
   },
   CourseName:{
    type:String,
    required:true
   },
   Amount:{
    type:Number,
    required:true
   },
 date:{
    type:Date,
    default:Date.now
 }
})
module.exports = mongoose.model("Cources",Productschema)