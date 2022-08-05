const handleError =(err,req,res,next)=>{
   console.log(err)
    if(err.code===11000){
        res.status(400).json({success:false,message:'this email already exists'}) 
    }
    if(err.name=='ValidationError'){
        res.status(400).json({success:false,message:err.message})
    }
 
     
}

module.exports = handleError