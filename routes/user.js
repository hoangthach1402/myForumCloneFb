const express = require('express')  
const router = express.Router()
const multer = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({ storage })

const userController = require('../controller/userController')
const {isAuthenticated,isAdmin} = require('../middleware/auth')



router.route('/').get(userController.getUsers)
router.get('/:userId/getallcomment',userController.getUserByIdWithComment)

router.get('/:userId/details',isAuthenticated,userController.getDetail)
router.post('/:userId/banned',isAuthenticated,isAdmin,userController.updateBanned)


module.exports = router

