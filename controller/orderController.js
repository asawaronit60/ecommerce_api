const Product = require('../model/product')
const Order = require('../model/orders')
const orderItem = require('../model/order-item')
const User = require('../model/users')
const { use } = require('../routes/order')

exports.getAllOrders = async (req, res) => {

  try {

    let data = await Order.find();

    res.status(200).json({
      status: 'Success',
      results: data.length,
      data
    })

  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    })
  }

}

exports.orderProduct = async (req, res) => {

  try {

    let user = req.user;
    if (user.isAdmin)
      return res.send('you are not allowed to order products')

    let productId = req.params.productId;
    let quantity = req.body.quantity * 1;

    if (!quantity)
      return res.send('Please provide a quantity')

    const product = await Product.findById(productId);

    if (!product)
      return res.send('Product not found')

    const orderitem = await orderItem.create({
      quantity,
      product: product._id
    })

    let order = new Order();
    order.orderItems = orderitem;
    order.shippingAddress1 = user.address;
    order.phone = user.phone;
    order.country = user.country;
    order.zip = user.zip
    order.city = user.city
    order.price = product.price * quantity
    order.user = user._id

    order = await order.save();

    let totalPrice = user.totalPrice + product.price


    await User.findByIdAndUpdate({ _id: user._id },
      { $push: { myOrders: order._id }, totalPrice }
    )

    res.status(200).json({
      status: 'Success',
      data: order
    })

  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    })
  }

}

// exports.removeProduct = async (req, res) => {

//   try {
//     let user = req.user
//     let prodID = req.params.productId

//     console.log(user.myOrders)

//     let data = await User.findByIdAndUpdate(user._id,
//       { $pull: { myOrders: prodID } }
//     )

//     res.status(200).json({
//       status: 'Success',
//       data
//     })

//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err.message
//     })
//   }
// }



exports.deleteAll = async (req, res) => {

  try {
    let user = req.user

    if (!user.isAdmin)
      return res.send({ message: 'You are not allowed to access this API' })

    await Order.deleteMany()

    res.status(200).json({
      status: 'Success',
      message: 'All the data deleted successfully'
    })

  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    })
  }

}