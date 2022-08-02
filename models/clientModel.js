const mongoose = require("mongoose");

const ClientModel = mongoose.Schema({
    userName: {
        type:String,
        require:true
    },
    userEmail: {
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    cart:{
        type:Array,
        default:[]
    },
    gender:{
        type:String,
        require:true
    }
    
},{timestamps:true}) 

module.exports = mongoose.model("client",ClientModel)