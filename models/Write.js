const mongoose = require('mongoose')  
const mongoosePaginate = require('mongoose-paginate-v2')

const likeItem= new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isLike:{type:Boolean,required:true}
})

const commentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content:{ type: String,required:true}
},{timestamps:true})

const writeSchema = new mongoose.Schema({
    user:{ type: mongoose.Schema.Types.ObjectId, ref: "User"},
    wall:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    content: { type:String},
    comments:[commentSchema],
    likes:[likeItem]
},
{
    timestamps:true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

writeSchema.virtual('fileUploads',{ 
    ref:'FileUpload',
    localField:'_id',
    foreignField:'doc'
})
writeSchema.plugin(mongoosePaginate)


const Write = mongoose.model('Write',writeSchema,'Write')
module.exports = Write




