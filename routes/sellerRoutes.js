const express = require("express")
const {sellerVerifyToken} = require("../verification/tokenVerification")
const sellerRoutes = express.Router()
const { sellerRegisterController,sellerLogInController, sellerProfileController,sellerStoreController ,sellerEditStoreController} = require('../controllers/sellerController')


sellerRoutes.post('/seller-register',sellerRegisterController)

sellerRoutes.get('/seller-login' ,sellerLogInController)

sellerRoutes.get('/seller/:id',sellerVerifyToken ,sellerProfileController)

sellerRoutes.get('/store/:id',sellerVerifyToken ,sellerStoreController )

sellerRoutes.put('/edit-store/:id',sellerVerifyToken ,sellerEditStoreController )




module.exports = sellerRoutes