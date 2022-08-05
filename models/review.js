const mongoose = require('mongoose')   


const reviewSchema = new mongoose.Schema({
    cave:{type:mongoose.Schema.Types.ObjectId,ref:'Cave'},
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
   
    content:String,
    

},{ timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

reviewSchema.virtual('fileUploads',{
    ref:'FileUpload',
    localField:'_id',
    foreignField:'doc'
})


const Review = mongoose.model('Review',reviewSchema,'Review')   
module.exports = Review