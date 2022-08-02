const express = require("express")
const { registerController, logInController, profileController, editProfileController,cartDetailsControllers ,addToCartController} = require("../controllers/clientController")
const {userVerifyToken} = require("../verification/tokenVerification")

const clientRoutes = express.Router()

clientRoutes.post('/user-register', registerController)

clientRoutes.get('/login', logInController)

clientRoutes.get('/user/:id',userVerifyToken, profileController)

clientRoutes.get('/user-cart/:id',userVerifyToken, cartDetailsControllers)

clientRoutes.put('/add-to-cart/:id',userVerifyToken, addToCartController)

clientRoutes.put('/edit-user/:id',userVerifyToken, editProfileController)

module.exports = clientRoutes