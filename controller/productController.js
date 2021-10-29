const Product = require('../model/product')

exports.getAllProducts = async (req, res) => {

  try {
    const data = await Product.find();
    res.status(200).json({
      status: 'Succcess',
      results: data.length,
      data
    })

  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    })
  }

}

exports.createProduct = async (req, res) => {

  try {

    ///check if the user is admin or not
      let user = req.user
      if(!user.isAdmin){
        return res.send('You are not allowed to add products')
      }

    //if admin then 
    const product = await Product.create(req.body);
    res.status(200).json({
      status: 'Success',
      data: product
    })

  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: err.message
    })
  }

}

exports.deleteAll  =async(req,res)=>{

try {
  
  await Product.deleteMany()

  res.status(200).json({
    status:'Success',
    message:'All the data deleted successfully'
  })

} catch (err) {
  res.status(404).json({
    status: 'fail',
    message: err.message
  })
}

}