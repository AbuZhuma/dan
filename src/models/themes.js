const mongoose = require("mongoose")
const producSchema = new mongoose.Schema({   
   bg: { type: String}
})

const Themes = mongoose.model('theme', producSchema, "themes");      

module.exports = Themes