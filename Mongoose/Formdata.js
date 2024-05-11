const mongoose = require('mongoose')
const Formdata = new mongoose.Schema({
    ParentName:{
        type:String,
        required:true
    },
    ParentEmail:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true
    },
    ChildName:{
        type:String,
        required:true
    },
    CourseName:{
        type:String,
        required:true
    },
    date:{
        type:Date,
    default:Date.now
    }
});

module.exports = mongoose.model("formdata",Formdata);