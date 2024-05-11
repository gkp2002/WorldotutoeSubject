const express = require('express')
const cors = require("cors")
const Payment = require('./Router/Payment')
const Forms = require('./Router/Detailform')
require('dotenv').config()
require('./Mongoose/config')
const crypto = require('crypto')
const app = express();
app.use(cors())
app.use(express.json())
app.use("/api/payment",Payment)
app.use("/api/formsdetail",Forms)
app.get("",(req,res)=>{
    res.send("Hello Server")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server Running on ${process.env.PORT}`)
})
