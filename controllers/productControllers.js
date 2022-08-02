const mongoose = require("mongoose")
const ProductModel = require("../models/productModel")



function getProducts(req, res) {

    let page = req.query.page || 1;
    let limitPerPage = 10;
    let totalItems

    let sortingType = req.query.sortingType || "default"

    if (sortingType === "newAdded") {
        // pagination 
        ProductModel.find().countDocuments()
            .then(count => {
                totalItems = count
                return ProductModel.find().skip((page - 1) * limitPerPage).limit(limitPerPage).sort({ createdAt: 1 })
            })
            .then(results => res.status(200).json({
                message: "sucssess",
                page: page,
                totalItems: totalItems,
                "body": results
            }))

    }
    else if (sortingType === "topRated") {

        ProductModel.find().countDocuments()
            .then(count => {
                totalItems = count
                return ProductModel.find().skip((page - 1) * limitPerPage).limit(limitPerPage).sort({ rating: 1 })
            })
            .then(results => res.status(200).json({
                message: "sucssess",
                page: page,
                totalItems: totalItems,
                "body": results
            }))
    }
    else if (sortingType === "highestPrice") {
        ProductModel.find().countDocuments()
            .then(count => {
                totalItems = count
                return ProductModel.find().skip((page - 1) * limitPerPage).limit(limitPerPage).sort({ price: -1 })
            })
            .then(results => res.status(200).json({
                message: "sucssess",
                page: page,
                totalItems: totalItems,
                "body": results
            }))
    }

    else if (sortingType === "lowestPrice") {
        ProductModel.find().countDocuments()
            .then(count => {
                totalItems = count
                return ProductModel.find().skip((page - 1) * limitPerPage).limit(limitPerPage).sort({ price: -1 })
            })
            .then(results => res.status(200).json({
                message: "sucssess",
                page: page,
                totalItems: totalItems,
                "body": results
            }))
    }

    else if (sortingType === "default") {
        ProductModel.find().countDocuments()
            .then(count => {
                totalItems = count
                return ProductModel.find().skip((page - 1) * limitPerPage).limit(limitPerPage)
            })
            .then(results => res.status(200).json({
                message: "sucssess",
                page: page,
                totalItems: totalItems,
                "body": results
            }))
    }
    else {

        res.status(400).json(
            {
                message: "sorting type is not found"
            }
        )
    }


}


function getProductByCat(req, res) {

    let enteredCategory = req.params.category || "default"
    let page = req.query.page || 1;
    let limitPerPage = 10;
    let sortType = req.query.sortType
    let totalItems


    if (req.params.category != "default") {

        if(sortType === "topRated"){
            ProductModel.find().countDocuments()
            .then(count => {
                totalItems = count
                return ProductModel.find().skip((page - 1) * limitPerPage).limit(limitPerPage).find({ category: enteredCategory }).sort({ rating: 1 })
            })
            .then(results => res.status(200).json({
                message: "sucssess",
                page: page,
                totalItems: totalItems,
                "body": results
            }))
        }
        else  if(sortType === "highestPrice"){
            ProductModel.find().countDocuments()
            .then(count => {
                totalItems = count
                return ProductModel.find().skip((page - 1) * limitPerPage).limit(limitPerPage).find({ category: enteredCategory }).sort({ price: -1 })
            })
            .then(results => res.status(200).json({
                message: "sucssess",
                page: page,
                totalItems: totalItems,
                "body": results
            }))
        }

        else  if(sortType === "lowestPrice"){
            ProductModel.find().countDocuments()
            .then(count => {
                totalItems = count
                return ProductModel.find().skip((page - 1) * limitPerPage).limit(limitPerPage).find({ category: enteredCategory }).sort({ price: 1 })
            })
            .then(results => res.status(200).json({
                message: "sucssess",
                page: page,
                totalItems: totalItems,
                "body": results
            }))
        }
      
        else {
            ProductModel.find().countDocuments()
            .then(count => {
                totalItems = count
                return ProductModel.find().skip((page - 1) * limitPerPage).limit(limitPerPage).find({ category: enteredCategory })
            })
            .then(results => res.status(200).json({
                message: "sucssess",
                page: page,
                totalItems: totalItems,
                "body": results
            }))
        }
    }


    else {
        res.status(400).json({ message: "no categories found" })

    }
}

function addproduct(req, res) {

    if (req.body.name.length < 3) {
        res.status(400).json({ message: "name is too short ,must be longer than 3 letters" })
    }

    else if (req.body.name != '' && req.body.imagePath != '') {

        let product = new ProductModel({
            name: req.body.name,
            imagePath: req.body.imagePath,
            discreption: req.body.discreption,
            quantity: req.body.quantity,
            category: req.body.category,
            price: req.body.price
        })
        product.save().then(result => res.status(201).json({ message: "product added succsessfully", body: result })).catch(e => console.log(e))

    }
    else {

        res.status(400).json({ message: "incomplete data" })
    }

}

function getSingleProduct(req, res) {
    let id = req.params.id
    ProductModel.findOne({ _id: id }).then(result => res.status(201).json({
        message: "succssess",
        body: result
    })).catch(e => res.status(400).json({ message: "cannot find this product" }));

}


function editProduct(req, res) {
    let id = req.params.id
    let filterBy = { _id: id };
    let editedVal = {
        name: req.body.name,
        imagePath: req.body.imagePath,
        discreption: req.body.discreption,
        quantity: req.body.quantity,
        category: req.body.category,
        price: req.body.price

    }
    ProductModel.findByIdAndUpdate(filterBy, editedVal, { new: true }).then(result => res.status(200).json({
        message: "succssess",
        body: result
    })).catch(e => res.status(200).json({ message: "cannot find this product" }));
}


function deleteProduct(req, res) {
    let id = req.params.id
    ProductModel.deleteOne({ _id: id }).then(result => res.status(200).json({
        message: "succssess",
        body: "deleted"
    })).catch(e => res.status(200).json({ message: "cannot find this product" }));
}

function searchProducts(req, res) {
    let name = req.params.productName
    ProductModel.findOne({ name: { $regex: name, $options: "1" } }).then(result => {
        if (result) {
            res.status(200).json({
                message: "succssess",
                body: result
            })
        }
           
        else{
            res.status(400).json({ message: "cannot find this product" })
        }
    }

    ).catch(e => res.status(400).json({ message:e}));

}

module.exports = { getProducts, getProductByCat, addproduct, getSingleProduct, editProduct, deleteProduct, searchProducts }