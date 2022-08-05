const express = require('express')
const router = express.Router()
const Cave = require('../models/cave')
const {isAuthenticated} = require("../middleware/auth")
const multer = require('multer')
const {storage} = require('../cloudinary')
const upload = multer({ storage })
const Review = require('../models/review')
const FileUpload = require('../models/fileUpload')

router.get('/:id',async(req,res)=>{
   const cave =  await Cave.findById(req.params.id).populate({path:'fileUploads'}).populate({path:'reviews',populate:{path:'user'}})
   console.log(cave)
   res.render('cave/detail',{cave})   
   // res.json(cave)
})
router.get('/',async(req,res)=>{
   const caves = await Cave.find().populate({path:'fileUploads'}) 
   
   res.json(caves)
})
router.route('/:id/review/new').get(async(req,res)=>{
   const cave = await Cave.findById(req.params.id)
   res.render('review/new',{cave})
}).post(isAuthenticated,upload.array('images'),async(req,res)=>{
   console.log('1',req.files)
   console.log('2',req.body.content) 
   console.log('3',req.user.id)

   const images = req.files ;
   const review = await Review.create({user:req.user.id,cave:req.params.id,content:req.body.content}) 
  
   for(var i=0;i<images.length;i++){
     await FileUpload.create({fileName:images[i].etag,filePath:images[i].url,doc:review._id,docModel:'Review'}) 
   }
   res.redirect(`/cave/${req.params.id}`)
   // console.log({content}) 
})
router.get('/:caveId/review/:reviewId',async (req,res)=>{
   const review = await Review.findById(req.params.reviewId).populate({path:'fileUploads',select:'filePath'}).populate('user','username')   
   // res.json(reviewDetail) 
   console.log(review)
   res.render('review/detail',{review})
})
module.exports = router