const express = require("express");
const router = express.Router();
const postController = require("../controller/postController");
const {isAuthenticated} = require("../middleware/auth")
const multer = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({ storage })


router.route("/").get(postController.getPosts)
router.post('/',isAuthenticated,upload.array('images'),postController.createPost)
router.route('/new').get(isAuthenticated,postController.get_newPost)
router.route('/:id').delete(postController.deletePost).get(postController.getPost)
router.post("/:postId/comment",isAuthenticated, postController.getPostComment);


module.exports = router;    







