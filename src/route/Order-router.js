const express = require('express')
const orderController = require('../controller/order-controller')
const authenticateMiddleware = require('../middlewares/Authenticate')

const router = express.Router()


router.get('/getOrder',orderController.getOrder)
router.delete('/getProductInOrder',authenticateMiddleware,orderController.getProductInOrder)
router.post('/getOrderAddIn',authenticateMiddleware,orderController.orderAddIn)
module.exports = router