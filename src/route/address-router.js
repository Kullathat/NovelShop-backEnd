const express = require('express')
const router = express.Router()
const addressController = require('../controller/address-controller')
const authenticateMiddleware = require('../middlewares/Authenticate')

router.post('/address',authenticateMiddleware,addressController.address)

module.exports = router