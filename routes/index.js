const express = require('express') 
const router = express.Router()
const userRouter = require('./user')
const commentRouter = require('./comment')
const postRouter = require('./post')
const reviewRouter = require('./review')
const fileUploadRouter = require('./fileUpload') //
const caveRouter = require('./cave')
const authRouter = require('./auth')
const {checkUser}= require('../middleware/auth')

router.use('*', checkUser);

router.use('/user',checkUser,userRouter) 
router.use('/comment',checkUser,commentRouter) 
router.use('/post',checkUser,postRouter) 
router.use('/review',checkUser,reviewRouter) 
router.use('/file',checkUser,fileUploadRouter) 
router.use('/cave',checkUser,caveRouter) 
router.use('/',authRouter) 

module.exports = router
