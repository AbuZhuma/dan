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

const publicDir = path.join(__dirname, 'public');
const imagesDir = path.join(publicDir, 'images');
const articlesDir = path.join(publicDir, 'articles');
const stylesDir = path.join(publicDir, 'styles');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
  fs.mkdirSync(imagesDir);
  fs.mkdirSync(articlesDir);
  fs.mkdirSync(stylesDir);
}
const articleCssPath = path.join(stylesDir, 'article.css');
if (!fs.existsSync(articleCssPath)) {
  const defaultCssContent = `@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');

*{

      font-family: "Roboto", serif;

  font-optical-sizing: auto;

}

p{

      margin: 0;

}

.body{


      background: #c7d9ddec;

}

.themes{

      height: 100%;  

      display: flex;

      flex-direction: column;

      align-items: center; 

      gap: 15px;



}



.main{      

      width: 1400px;

      display: flex;

      flex-direction: column;

      align-items: center;

      gap: 15px;

}

.header{

      display: flex;

      align-items: center;

      justify-content: space-between;

      width: 100%;

      max-width: 1400px;

      height: 80px;

      padding: 0px 20px;

      background: white;

      border: 1px solid rgba(128, 128, 128, 0.5);

      box-shadow: 0 0 20px 0 rgba(128, 128, 128, 0.267);

      border-radius: 5px;

      margin-top: 10px;

}

.logo{

      font-size: 30px;

      font-weight: 600;

}

.nav{

      display: flex;

      gap: 20px;

}

.nav a{

      text-decoration: none;

      color: rgba(16, 16, 122, 0.705);

      font-size: 20px;

      cursor: pointer;

      font-weight: 500;

}





.footer{

      display: flex;

      align-items: center;

      justify-content: space-between;

      width: 100%;

      max-width: 1400px;

      height: 70px;

      padding: 0px 20px;

      background: white;

      border: 1px solid rgba(128, 128, 128, 0.5);

      box-shadow: 0 0 20px 0 rgba(128, 128, 128, 0.267);

      border-radius: 5px;

      margin-bottom: 10px;

}



.danm{

      font-size:18px;

}



.section{

      display: flex;

      flex-direction: column;

      align-items: start;

      width: 100%;

      padding: 20px;

      background: white;

      border: 1px solid rgba(128, 128, 128, 0.5);

      box-shadow: 0 0 20px 0 rgba(128, 128, 128, 0.267);

      border-radius: 5px;

      gap: 20px;

      overflow: hidden;

}

.title1{

      margin-bottom: 10px;

      font-size: 30px;

      font-weight: 600;

      text-transform:uppercase;

}

.title2{

      margin-bottom: 10px;

      font-size: 24px;

      font-weight: 600;

      text-transform:uppercase;

}

.text{

      font-size: 20px;

      color: #383838;

}

.imgc{

      width: 100%;

      display: flex;

      justify-content: center;

      gap: 10px;

}

.img{

      transition: all 0.3s ease;

      object-fit: cover;

      outline: none;

}

.img1{

      width: 100%;

      max-height: 600px;

}

.img2{

      max-width: 50%;

      max-height: 500px;

}

.img:hover{

      cursor: pointer;

      outline: 1px solid black;

      transition: all 0.3s ease;

}

@media (max-width: 1400px) {

      .main {

          width: 100%;

          padding: 0 0px;

      }

  }



  @media (max-width: 1200px) {

      .header, .footer {

          padding: 0 15px;

      }



      .logo {

          font-size: 26px;

      }



      .nav a {

          font-size: 18px;

      }



      .title1 {

          font-size: 26px;

      }



      .title2 {

          font-size: 22px;

      }



      .text {

          font-size: 18px;

      }



      .img1 {

          max-height: 500px;

      }



      .img2 {

          max-height: 400px;

      }

  }



  @media (max-width: 992px) {

      .header, .footer {

          height: 70px;

      }



      .logo {

          font-size: 24px;

      }



      .nav a {

          font-size: 16px;

      }



      .title1 {

          font-size: 24px;

      }



      .title2 {

          font-size: 20px;

      }



      .text {

          font-size: 16px;

      }



      .img1 {

          max-height: 400px;

      }



      .img2 {

          max-height: 300px;

      }

  }



  @media (max-width: 768px) {

      .header, .footer {

          height: 60px;

          padding: 0 10px;

      }



      .logo {

          font-size: 22px;

      }



      .nav a {

          font-size: 14px;

      }



      .title1 {

          font-size: 22px;

      }



      .title2 {

          font-size: 18px;

      }



      .text {

          font-size: 14px;

      }



      .img1 {

          max-height: 300px;

      }



      .img2 {

          max-height: 200px;

      }



      .section {

          padding: 15px;

      }



      .imgc {

          flex-direction: column;

          align-items: center;

      }



      .img2 {

          max-width: 100%;

      }

  }



  @media (max-width: 576px) {

      .header, .footer {

          height: 50px;

          padding: 0 5px;

      }

      .footer{

            display: flex;

            flex-direction: column;

            align-items: center;

            justify-content: center;

      }

      .logo {

          font-size: 14px;

      }



      .nav a {

          font-size: 12px;

      }



      .title1 {

          font-size: 20px;

      }



      .title2 {

          font-size: 16px;

      }



      .text {

          font-size: 12px;

      }



      .img1 {

          max-height: 200px;

      }



      .img2 {

          max-height: 150px;

      }



      .section {

          padding: 10px;

      }



      .danm {

          font-size: 14px;

      }

  }



  @media (max-width: 400px) {

      .header, .footer {

          height: 40px;

      }





      .nav a {

          font-size: 10px;

      }



      .title1 {

          font-size: 18px;

      }



      .title2 {

          font-size: 14px;

      }



      .text {

          font-size: 10px;

      }



      .img1 {

          max-height: 150px;

      }



      .img2 {

          max-height: 100px;

      }



      .danm {

          font-size: 12px;

      }

  }`;
  fs.writeFileSync(articleCssPath, defaultCssContent);
  console.log('File created:', articleCssPath);
} else {
  console.log('File already exists:', articleCssPath);
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