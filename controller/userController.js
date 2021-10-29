const User = require('../model/users')
const bcrypt = require('bcrypt')
const Order = require('../model/orders')
exports.getAllUsers = async (req, res) => {

  try {
    let user
    if (req.user) {
      user = req.user
    }
    if (!user.isAdmin)
      res.status(200).json({
        status: 'Fail',
        message: 'Only admins are allowed'
      })
    else {
      const data = await User.find({ isAdmin: false });
      res.status(200).json({
        status: 'success',
        results: data.length,
        data
      })
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    })
  }

}

exports.getUser = async (req, res) => {

  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      user
    })

  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    })
  }

}

exports.createUser = async (req, res) => {

  try {

    let user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      isAdmin: req.body.isAdmin,
      passwordHash: bcrypt.hashSync(req.body.password, 10),
      city: req.body.city,
      country: req.body.country,
      zip: req.body.zip
    })

    user = await user.save();
    if (!user) {
      return res.status(400).send('the user cannot be created!')
    }

    res.status(200).json({
      status: 'Success',
      user
    })

  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    })
  }

}

exports.updateUser = async (req, res) => {

  try {


    let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    res.status(200).json({
      status: 'Success',
      data: user
    })


  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: error
    })
  }

}

exports.getMyOrders = async (req, res) => {

  try {

    const user = req.user;

    if (user.isAdmin) {
      let data = await Order.find()
      return res.status(200).json({
        status: 'Success',
        results: data.length,
        data
      })

    }

    const orders = await User.findById(user._id).select('myOrders totalPrice -_id ').populate({
      path: 'myOrders',
      // select:'orderItems'
    })

    res.status(200).json({
      status: 'Success',
      results: orders.myOrders.length,
      data: orders
    })


  } catch (error) {
    console.log(error)
    res.status(404).json({
      status: 'fail',
      message: error.message
    })
  }

}
