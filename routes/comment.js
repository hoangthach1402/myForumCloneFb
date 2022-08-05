const express = require('express')
const router = express.Router()
const Comment= require('../models/comment') 




//commentForPost
router.get('/',async(req,res)=>{
    const comment = await Comment.find().populate('doc')    
    res.json(comment)
})
router.post('/post/:postId/review/:reviewId/',async(req,res)=>{
      const comment = await Comment.create({user:req.body.user,content:req.body.content,doc:req.params.reviewId,docModel:'Review'})    
      res.json(comment)
    })   
    
    
module.exports = router