const mongoose = require("mongoose")
const commentSchema = new mongoose.Schema({   
   id: { type: String, required: true, unique: true }, 
   text: { type: String, required: true },
   url: { type: String },
   date: { type: String, required: true},  
})

const Comment = mongoose.model('comment', commentSchema, "comments");      

module.exports = Comment