const mongoose = require("mongoose")
const photoSchema = new mongoose.Schema({   
   id: { type: String, required: true, unique: true }, 
   filename: { type: String, required: true },
   originalname: { type: String, required: true},  
   size: { type: String, required: true}, 
   path: { type: String, required: true},  
   url: { type: String, required: true},  
   title: { type: String, required: true}
})

const Photo = mongoose.model('photo', photoSchema, "gallery");      

module.exports = Photo