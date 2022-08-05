const express = require('express')  
const router = express.Router()
const FileUpload = require('../models/fileUpload')


router.get('/',async(req,res)=>{
    const files = await FileUpload.find() 
    res.json(files)
})


module.exports = router
