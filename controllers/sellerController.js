const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const SellerModel = require('../models/sellerModel');


async function sellerRegisterController(req, res) {

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let gender = req.body.gender;
    let categories = req.body.categories;
    let storeName = req.body.storeName;
    let products = req.body.products

    // regular expression for name and password
    let nameRegExp = new RegExp('^' + name + '$', "i");
    let emailRegExp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;


    // password hashing 

    // validations 
    if (!nameRegExp) {
        res.status(400).json({
            message: "name is not valid "
        })
    }

    else if (!emailRegExp.test(email)) {
        res.status(400).json({
            message: "email is not valid "
        })
    }
    else if (email.length === 0) {
        res.status(400).json({
            message: "email is empty "
        })
    }
    else if (password.length === 0) {
        res.status(400).json({
            message: "password is empty "
        })
    }

    else if (password.length < 6) {
        res.status(400).json({
            message: "password is too short minimum length is 6 characters "
        })
    }
    else {

        let isEmailExisted = await SellerModel.findOne({ userEmail: email })
        if (isEmailExisted) {
            res.status(400).json({ message: "there is account with this email" })
        }
        else {
            let hashedPassword = bcrypt.hashSync(password, 12)
            let seller = new SellerModel({

                sellerName: name,
                sellerEmail: email,
                gender: gender,
                password: hashedPassword,
                categories: categories,
                storeName: storeName,
                products: products
            })

            seller.save().then(result => res.status(201).json({
                message: "sucssess",
                body: result
            }))
        }

    }

}

function sellerLogInController(req, res) {
    let email = req.body.email
    let password = req.body.password

    if (email.length === 0) {
        res.status(400).json({
            message: "email is empty "
        })
    }
    else if (password.length === 0) {
        res.status(400).json({
            message: "password is empty "
        })
    }
    else {
        SellerModel.findOne({ email: email }).then((result) => {

            let hashedPassword = bcrypt.compareSync(password, result.password)
            if (hashedPassword) {

                const token = jwt.sign({ _id: result.id }, process.env.SELLER_TOKEN_SECRET)

                res.header('seller-token', token).status(200).json({
                    message: "succsess",
                    body: result
                })
            }

            else {
                res.status(400).json({
                    body: "Wrong password"
                })
            }
        })
    }

}

function sellerProfileController(req, res) {
    let id = req.params.id

    SellerModel.findOne({ _id: id }).then(result => {
        res.status(200).json({
            message: "sucssess",
            body: result
        })

    }).catch(e => res.status(400).json({
        message: "seller not found",

    }))

}

function sellerStoreController(req, res) {
    const id = req.params.id
    SellerModel.findById(id).then(result =>

        res.status(200).json({
            message: "sucssess",
            body: result.products
        })
    ).catch(e => res.status(400).json({
        message: "store not found",

    }))
}


async function sellerEditStoreController(req, res) {
    let productList = []
    let categoriesList = []

    const id = req.params.id


    let valuesFromSellerProfile = await SellerModel.findById(id)


    productList.push(...valuesFromSellerProfile.products)
    categoriesList.push(...valuesFromSellerProfile.categories)
    

    let productUpdatedVal = {
        products: [
            ...productList,
            req.body.products
        ],

        categories: [
            ...categoriesList,
            req.body.categories
        ]
    }
    // then(result =>{

    //     productList.push(...result.products ) ,
    //     categoriesList.push(...result.categories)
    // } )

    SellerModel.findByIdAndUpdate(id, productUpdatedVal, { new: true }).then(result => {
        res.status(200).json({
            message: "sucssess",
            body: result
        })
    })

}
module.exports = { sellerRegisterController, sellerLogInController, sellerProfileController, sellerStoreController, sellerEditStoreController }