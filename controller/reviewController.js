const Review = require('../models/review')
const FileUpload = require('../models/fileUpload.js')

const reviewController = {
    getReviews:async(req,res)=>{
        const review = await Review.find().populate({path:'fileUploads'})
        const count = review.length
        res.json({count,review}) 
     },
     getReview:async(req,res)=>{
  
        const review =  await Review.findById(req.params.id).populate({path:'fileUploads'})
      
        res.json(review)
     },
     createReview:async(req,res)=>{
        const images = req.body.files ;
        const review = await Review.create({user:req.body.user,cave:req.body.cave,content:req.body.content}) 
       
        for(var i=0;i<images.length;i++){
          await FileUpload.create({fileName:images[i].filename,filePath:images[i].filepath,doc:review._id,docModel:'Review'}) 
        }
        res.json({review,images})
  }
}


module.exports = reviewController