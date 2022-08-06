const bcrypt = require('bcryptjs')
const ClientModel = require('../models/clientModel')
const jwt = require('jsonwebtoken')

function logInController(req, res) {
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


        ClientModel.findOne({ email: email }).then((result) => {


            let hashedPassword = bcrypt.compareSync(password, result.password)
            if (hashedPassword) {


                const token = jwt.sign({ _id: result.id }, process.env.TOKEN_SECRET)

                res.header('user-token', token).status(200).json({
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

async function registerController(req, res) {

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    let gender = req.body.gender;

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

        let isEmailExisted = await ClientModel.findOne({ userEmail: email })
        if (isEmailExisted) {
            res.status(400).json({ message: "there is account with this email" })
        }
        else {
            let hashedPassword = bcrypt.hashSync(password, 12)
            let client = new ClientModel({

                userName: name,
                userEmail: email,
                gender: gender,
                password: hashedPassword
            })

            client.save().then(result => res.status(201).json({
                message: "sucssess",
                body: result
            }))
        }

    }

}

function profileController(req, res) {
    let id = req.params.id

    ClientModel.findOne({ _id: id }).then(result => {
        res.status(200).json({
            message: "sucssess",
            body: result
        })

    }).catch(e => res.status(400).json({
        message: "user not found",

    }))
}

function editProfileController(req, res) {

    const id = req.params.id
    let userUpdatedValue = {

        userName: req.body.name,
        userEmail: req.body.email,
    }
    ClientModel.findByIdAndUpdate(id, userUpdatedValue, { new: true }).then(result => {
        res.status(200).json({
            message: "sucssess",
            body: result
        })

    }).catch(e => res.status(400).json({
        message: "user not found",

    }))
}

function cartDetailsControllers(req, res) {

    const id = req.params.id
    ClientModel.findById(id).then(result =>

        res.status(200).json({
            message: "sucssess",
            body: result.cart
        })
    ).catch(e => res.status(400).json({
        message: "user not found",

    }))
}

function addToCartController(req, res) {
    let cartList = []

    const id = req.params.id

    ClientModel.findById(id).
        then(result => cartList = result.cart).then(() => {
            let cartUpdatedVal = {
                cart: [
                    ...cartList,
                    req.body.cart
                ]
            }

            ClientModel.findByIdAndUpdate(id, cartUpdatedVal, { new: true }).then(result => {
                res.status(200).json({
                    message: "sucssess",
                    body: result
                })
            })

        }


        )

}


module.exports = { registerController, logInController, profileController, editProfileController, cartDetailsControllers, addToCartController }