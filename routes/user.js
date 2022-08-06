const express = require('express')  
const router = express.Router()
const multer = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({ storage })

const userController = require('../controller/userController')
const {isAuthenticated,isAdmin,checkOwner} = require('../middleware/auth')



router.route('/').get(userController.getUsers)
router.get('/:userId/getallcomment',userController.getUserByIdWithComment)

router.get('/:userId/details',isAuthenticated,checkOwner,userController.getDetail)
router.post('/:userId/banned',isAuthenticated,checkOwner,userController.updateBanned)


module.exports = router

