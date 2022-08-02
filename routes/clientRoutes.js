const express = require("express")
const { registerController, logInController, profileController, editProfileController,cartDetailsControllers ,addToCartController} = require("../controllers/clientController")
const verify = require("../verification/tokenVerification")

const clientRoutes = express.Router()

clientRoutes.post('/user-register', registerController)

clientRoutes.get('/login', logInController)
clientRoutes.get('/user/:id',verify, profileController)

clientRoutes.get('/user-cart/:id',verify, cartDetailsControllers)

clientRoutes.put('/add-to-cart/:id',verify, addToCartController)

clientRoutes.put('/edit-user/:id',verify, editProfileController)

module.exports = clientRoutes