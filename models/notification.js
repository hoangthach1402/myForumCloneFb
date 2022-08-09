const mongoose = require('mongoose')    

const notifySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

})

//bai viet cua ban nhan 1 luot thich  
//ban nhan 1 luot ket ban tu 
//ban nhan duoc 1 follow tu  
// 