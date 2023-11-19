const express = require('express')
const orderController = require('../controller/order-controller')
const authenticateMiddleware = require('../middlewares/Authenticate')
const uploadMiddleware = require('../middlewares/upload')


const router = express.Router()


router.get('/getOrder',orderController.getOrder)
router.delete('/getProductInOrder',authenticateMiddleware,orderController.getProductInOrder)
router.post('/createOrderFromCart',authenticateMiddleware,orderController.createOrderFromCart)

router.patch(
    '/uploadSlip',authenticateMiddleware,uploadMiddleware.fields([{name: "slip", maxCount : 1}]),orderController.uploadSlip
)
module.exports = router