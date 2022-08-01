const mongoose = require("mongoose");


// {
//     id: 1212,
//     name: "tshirt polo",
//     imagePath: "assets/polotshirt",
//     discription: "a good quality tshirt",
//     quantity: 122,
//     rating: 3.5,
//     price:121,
//     category: "clothes",
//     date:"8/1/2022, 11:28:40 PM",

// },


const ProductModel = mongoose.Schema({
    imagePath: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    discreption: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model("products", ProductModel) 