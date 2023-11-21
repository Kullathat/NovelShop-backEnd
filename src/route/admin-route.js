const express = require('express')
const authenticateMiddleware = require('../middlewares/Authenticate')
const adminController = require('../controller/admin-controller')
const router = express.Router()


router.get('/all',adminController.getAllOrder)
router.post('/addItem',adminController.addItem)
router.patch('/confirmOrder',adminController.confirmOrder)
router.get('/allBook',adminController.bookProduct)
router.delete('/delete/:orderId',adminController.deleteOrder)
module.exports = router