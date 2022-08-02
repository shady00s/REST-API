const mongoose = require("mongoose");

const SellerModel = mongoose.Schema({
    sellerName: {
        type:String,
        require:true
    },
    sellerEmail: {
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
   
    gender:{
        type:String,
        require:true
    },

    storeName:{
        type:String,
        require:true
    },
    categories:{
        type:Array,
        default:[]
    },
    products:{
        type:Array,
        default:[]
    }
    
},{timestamps:true}) 

module.exports = mongoose.model("seller",SellerModel)