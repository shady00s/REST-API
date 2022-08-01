const express = require("express")
const { getProducts, getProductByCat, addproduct, getSingleProduct, editProduct, deleteProduct ,searchProducts} = require("../controllers/productControllers")

const productRoutes = express.Router()


productRoutes.get('/products/category/:category', getProductByCat)


productRoutes.get('/all-products', getProducts)

productRoutes.get('/search/:productName', searchProducts)


productRoutes.post('/add-product',  addproduct)


productRoutes.get('/product-info/:id', getSingleProduct)

productRoutes.put('/edit-product/:id',editProduct)

productRoutes.delete('/delete-product/:id',deleteProduct)



module.exports = productRoutes