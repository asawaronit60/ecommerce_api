const express = require('express')
const authController = require('../controller/authController')
const orderController = require('../controller/orderController')

const router = express.Router();


router.route('/placeOrder/:productId').post(authController.protect,orderController.orderProduct)
router.route('/').delete(authController.protect , orderController.deleteAll)

module.exports = router