const jwt = require('jsonwebtoken')
const User = require('../model/users')
const util = require('util')
const bcrypt = require('bcrypt')
const signtoken = (id)=>{
    return  jwt.sign({ id:id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRES_IN
    })
}

const createSendToken = (user,statusCode,res) =>{
    const token = signtoken(user._id);

   const cookieOptions =  {
       expires:new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 *60 *60 *1000),
       secure: false ,
       httpOnly: true
}

  res.cookie('jwt',token,cookieOptions)

   //remove the pasword from the optput
      user.password= undefined
 
      res.status(statusCode).json({
       status:'success',
       token,
       data:{
           user
       }
   })
}

exports.login = async(req,res)=>{
    try{
        const {email,passwordHash }  = req.body;
    
    //check if email and password exists
        if(!email || !passwordHash)
      return  res.send('Please enter email or password')

    // check id user exists and password is correct
     const user =  await User.findOne({email}).select('+passwordHash')
        
      if(!user || !(await bcrypt.compareSync( passwordHash ,  user.passwordHash ) ))
      return new Error('Incorrect email or password')


      
    //if everything ok then send token to the client
      createSendToken(user,200,res);


    }catch(err){
        res.status(404).json({
            status:'Fail',
            message:err.message
        })
    }
}

exports.protect = async (req,res,next)=>{
    let token  
//1)get token and check if its there
      if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
       token = req.headers.authorization.split(' ')[1];
      } else if(req.cookies.jwt){
      token = req.cookies.jwt
      }

          
     if(!token || token==undefined) 
//   return res.status(400).json({ message:'you are not logged in!'})
  return res.send({message:'you are not logged in! please log in to get access'})
 
//2)validate token
    const decoded = await util.promisify(jwt.verify)(token,process.env.JWT_SECRET)
     
//3)check is user still exists
       const currentUser = await User.findById(decoded.id)
       if(!currentUser)
       return res.status(400).json({message:'User belonging to this token no longer exists'})
   

// // 4)check if user changed password after token was issued
//        if(currentUser.changedPasswordAfter(decoded.iat)){
//            return next(new AppError('User recently changed password',401))
//        }
              
          req.user = currentUser;
     
          next();

}