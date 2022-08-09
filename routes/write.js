const Write = require("../models/Write");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const writeController = require('../controller/writeController')

// dashboard

// get post by wall
router.get("/",writeController.getAll );
router.post("/",upload.array("images"), writeController.createWrite);
 
router.get('/:writeId/details',writeController.getDetail)

router.put('/:writeId',writeController.addComment)
router.put('/:writeId/like',writeController.addLike)
router.delete('/:writeId',writeController.deleteWrite)

module.exports = router;
