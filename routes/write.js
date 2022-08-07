const Write = require("../models/Write");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });
const FileUpload = require('../models/fileUpload')
// dashboard

// get post by wall
router.get("/", async (req, res) => {
  const wall = req.headers.referer.split("/")[4];
  const writes = await Write.find({ user: wall });
  res.render("users/detail", { writes });
});

router.post("/", upload.array("images"), async (req, res) => {
  const content = req.body.content;
  const wall = req.headers.referer.split("/")[4] || req.user.id;
  const body = {
    user: req.user.id,
    wall: wall,
    content: content,
  };

  const write = new Write(body);
  await write.save();
  const images = req.files;
 console.log('images: req.files: ->',req.files)
  for (var i = 0; i < images.length; i++) {
    await FileUpload.create({
      fileName: images[i].etag,
      filePath: images[i].url,
      doc: write._id,
      docModel: "Write",
    });
  }

  res.redirect("back");
  // res.json(write)
});
router.put('/:writeId',async(req,res)=>{

  const comment ={
    content:req.body.commentInput,
    user:req.user.id,
  }
    
//  console.log(req.params.writeId) 
  const write = await Write.findById(req.params.writeId) 
  write.comments.push(comment)
  await write.save() 
  res.redirect('back')
})
router.delete('/:writeId',async(req,res)=>{
  // console.log()
  const write = await Write.findById(req.params.writeId);
    await write.remove()
   res.redirect('back')
})

module.exports = router;
