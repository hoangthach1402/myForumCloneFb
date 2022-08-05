const User = require('../models/user');
const asyncHandler = require('../utils/async');
const {generateToken} = require('../utils/auth')
const  userController = {
  getUsers: async (req, res) => {
    const users = await User.find();
    res.json(users);
  },
getUserByIdWithComment :async(req,res)=>{
    const userWithReview = await User.findById(req.params.userId).populate({path:'comments',select:'content'})  
    res.json(userWithReview) 
},
getDetail:(async(req,res,next)=>{
  try{
    const user =  await User.findById(req.params.userId).populate({path:'comments',populate:{path:'cave',select:'name'}}).populate({path:'reviews',populate:{path:'cave',select:'name'}}).populate('posts').limit(5)
    console.log(user)
    res.render('user/detail',{user}) 

  }catch(err){
    next(err)
  }
}),
updateBanned:async(req,res,next)=>{
  try{
    res.send('banned')
  }catch(err){
    next(err)
  }
}
};

module.exports = userController