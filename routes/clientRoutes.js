const express = require("express")
const { registerController, logInController, profileController, editProfileController,cartDetailsControllers ,addToCartController} = require("../controllers/clientController")


const clientRoutes = express.Router()

clientRoutes.post('/user-register', registerController)

clientRoutes.get('/login', logInController)
clientRoutes.get('/user/:id', profileController)

clientRoutes.get('/user-cart/:id', cartDetailsControllers)

clientRoutes.put('/add-to-cart/:id', addToCartController)

clientRoutes.put('/edit-user/:id', editProfileController)

module.exports = clientRoutes