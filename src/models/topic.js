const mongoose = require("mongoose")
const producSchema = new mongoose.Schema({   
   id: { type: String, required: true, unique: true }, 
   text: { type: String, required: true }
})

const Topic = mongoose.model('topic', producSchema, "topics");      

module.exports = Topic