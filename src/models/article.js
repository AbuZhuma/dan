const mongoose = require("mongoose")
const producSchema = new mongoose.Schema({   
   article_id: { type: String, required: true, unique: true }, 
   title: { type: String, required: true },
   desc: { type: String, required: true},  
   image: { type: String, required: true },   
   src: { type: String, required: true },
   article_url: { type: String, required: true }
})

const Article = mongoose.model('article', producSchema, "articles");      

module.exports = Article