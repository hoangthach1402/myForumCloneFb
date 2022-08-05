const mongoose = require('mongoose')

const fileUploadSchema = new mongoose.Schema({
    doc:{
        refPath:'docModel',
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    docModel:{
        type:String,
        required:true,
        enum:['Cave','User','Review']
    },
    fileName:{type:String},
    filePath:{type:String},
},{timestamps:true})
    
 
const FileUpload = mongoose.model('FileUpload',fileUploadSchema,'FileUpload')
module.exports = FileUpload      





