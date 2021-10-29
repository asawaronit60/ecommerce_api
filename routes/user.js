const express = require('express')
const userController = require('../controller/userController')
const authController = require('../controller/authController')
const productController = require('../controller/productController')

const router = express.Router();


router.route('/').post( userController.createUser)
                 .get(authController.protect, userController.getAllUsers)

router.route('/:id' ).patch(userController.updateUser)
router.route('/login').post(authController.login)

router.route('/getProducts').get(authController.protect ,productController.getAllProducts )

router.route('/getOrders').get(authController.protect , userController.getMyOrders)

module.exports = router