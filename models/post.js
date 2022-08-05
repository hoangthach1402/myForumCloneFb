const mongoose = require('mongoose')    
const slugify = require('slugify') 
const postSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    cave:{type:mongoose.Schema.Types.ObjectId,ref:'Cave'},
    description:{type:String,required:true},
    title:{type:String,required:true},  
    slug:{type:String}
},{ timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
}
)

postSchema.pre('save', function(next) {
    this.slug = slugify(this.title, { lower: true });
    next();
  });


postSchema.virtual('comments',{
    ref:'Comment',
    localField:'_id',
    foreignField:'doc'
})


const Post = mongoose.model('Post',postSchema,'Post') 
module.exports = Post