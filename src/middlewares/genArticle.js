const { createFile } = require("../helpers/filesystem")
const CLIENT = process.env.CLIENT;

const methods = {
      img1: function(value) {
            return `<a class="imgc" href="${value}">
                              <img src="${value}" class="img img1">
                        </a>`
      },
      img2: function(value){
            return `<a class="imgc" href="${value}">
                              <img src="${value}" class="img img2">
                        </a>`
      },
      title1: function(value){
            return `<p class="title1">${value}</p>`
      },
      title2: function(value){
            return `<p class="title2">${value}</p>`
      },
      text: function(value){
            return ` <p class="text">${value}</p>`
      },
}
function getSections(input) {
      const splitByFirstColon = (str) => {
            const colonIndex = str.indexOf(":");
            if (colonIndex === -1) {
              return [str]; 
            }
            return [str.slice(0, colonIndex), str.slice(colonIndex + 1)];
      };
      const sectionsSrc = input.split("\n")
      const result = sectionsSrc.reduce((acc, item) => {
            if (item.includes("section:")) {
              acc.push([]);
            } else if (acc.length > 0) {
              if(!splitByFirstColon(item)[1]){
                  acc.at(-1).at(-1)[1] = acc.at(-1).at(-1)[1] + splitByFirstColon(item)[0]
              }else{
                  acc[acc.length - 1].push(splitByFirstColon(item));
              }
            }
            return acc;
      }, []);
      return result
}

function genHtml(src, title, desc) {
      const sorted = getSections(src);
      const main =`<!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" href="../styles/article.css">
      <meta http-equiv="Content-Security-Policy" content="
        default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;
        script-src * 'unsafe-inline' 'unsafe-eval' data: blob:;
        img-src * data: blob:;
        style-src * 'unsafe-inline';
        font-src * data:;
        connect-src *;
        media-src * data: blob:;
        object-src *;
        frame-src *;
        frame-ancestors *;">
      <title>${title}</title>
      <meta name="description" content="${desc}">
      </head>
      <body>
            <div class="themes">
                  <header class="header">
                        <p class="logo">DAN ${title}</p>
                        <nav class="nav">
                              <a href="${CLIENT}/">home</a>
                              <a href="${CLIENT}/contacts">contacts</a>
                              <a href="${CLIENT}/admin">admin</a>
                        </nav>
                  </header>
                      <main class="main">
                              ${sorted
                                .map((section) => {
                                  return `<section class="section">${section
                                    .map((el) => {
                                    if(el[0] && methods[el[0]]){
                                          let teg = methods[el[0]](el[1]);
                                      return teg;
                                    }else{
                                    return " "
                                    }  
                                    })
                                    .join("")} 
                                  </section>`;
                                })
                                .join("")} 
                        </main>
                  <footer class="footer">
                        <p class="danm">DAN - Dzhumagulov Abdyrakhman Numanovitch</p>
                        <p class="danm">© 2024 All rights reserved</p>
                  </footer>
            </div>
      </body>
      </html>`
      return main;
}

function generate(src, title, desc) {
      const URL = process.env.URL;
      let code = genHtml(src, title, desc)
      let filename = `${title.replace(/\s+/g, "_")}.html`
      createFile(filename, code, "./public/articles")
      return `${URL}/public/articles/${filename}`
}

const genArticle = async(req, res, next) => {
      try {
            if(!req.body.src || !req.body.title){
                  res.status(401).json({
                        message: "Please send src end title"
                  })   
                  return
            }
            const resp = await generate(req.body.src, req.body.title, req.body.desc)
            req.body.article_url = resp
            next()
      } catch (error) {
            console.log(error);
            res.status(501).json({
                  message: "genArticle problem"
            })
      }
}
module.exports = genArticle