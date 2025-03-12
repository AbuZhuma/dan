const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const users = require("./src/routes/users")
const articles = require("./src/routes/articles")
const comments = require("./src/routes/comments")
const topic = require("./src/routes/topic")
const gallery = require("./src/routes/gallery")
const themes = require("./src/routes/themes")

const rateLimit = require('express-rate-limit');
const path = require('path');
const { deleteFile } = require('./src/helpers/filesystem');
const Photo = require('./src/models/photo');
const Article = require('./src/models/article');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  keyGenerator: (req, res) => req.clientIp,
});
const public = path.join(__dirname, 'public');

app.use(limiter);
app.use(cors());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["*", "'unsafe-inline'", "'unsafe-eval'", "data:", "blob:"],
      scriptSrc: ["*", "'unsafe-inline'", "'unsafe-eval'", "data:", "blob:"],
      imgSrc: ["*", "data:", "blob:"],
      styleSrc: ["*", "'unsafe-inline'"],
      fontSrc: ["*", "data:"],
      connectSrc: ["*", "data:", "blob:"],
      mediaSrc: ["*", "data:", "blob:"],
      objectSrc: ["*"],
      frameSrc: ["*"],
      frameAncestors: ["*"],
    },
  })
);
app.use(express.json());
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const imagesDir = path.join(publicDir, 'images');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

app.use('/public', express.static(public));

const PORT = process.env.PORT || 5000;
const dbURI = process.env.MONGO_URI;
const URL = process.env.URL;

mongoose
  .connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/users/', users)
app.use('/articles/', articles)
app.use('/comments/', comments)
app.use('/topic/', topic)
app.use('/gallery/', gallery) 
app.use('/themes/', themes)

app.delete('/public/*', async (req, res) => {
  const filePath = req.params[0]; 
  if (!filePath) {
    return res.status(400).json({ success: false, message: 'Путь к файлу не указан' });
  }
  const result = await deleteFile(filePath);
  
  if (result.success) {
    if(req.params[0].split("/")[0].includes("images")){
      const del = await Photo.findOneAndDelete({url: `${URL}/public/${req.params[0]}`})
    }else if(req.params[0].split("/")[0].includes("articles")){
      const del = await Article.findOneAndDelete({article_url: `${URL}/public/${req.params[0]}`})
    }
    result.message = "File deleted!"
    res.status(200).json(result);
  } else {
    res.status(404).json(result);
  } 
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});