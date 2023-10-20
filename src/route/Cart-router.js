const express = require('express')
const authenticateMiddleware = require('../middlewares/Authenticate')
const productController = require('../controller/product-controller')

const router = express.Router()

router.get('/allbook',productController.product)
router.post('/cart',authenticateMiddleware, productController.addCart)
router.get('/cartItem',productController.cartItem)
router.delete('/deleteItem/:cartId',productController.deleteItem)
router.post('/addItem',productController.addItem)


module.exports = router