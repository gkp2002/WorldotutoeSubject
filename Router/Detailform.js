const express = require('express')
const Router = express.Router();
const Formdata = require('../Mongoose/Formdata')

Router.post("/form",async(req,res)=>{
    console.log(req.body)
let data = new Formdata(req.body.data);
let result = await data.save();
res.send(result)
})
module.exports = Router