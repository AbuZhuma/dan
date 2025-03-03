const generateRandomID = require("../../helpers/genIdH");
const Article = require("../../models/article");

const createArticle = async (req, res) => {
      try { 
            let id = await generateRandomID(10)
            
            let prod = {
                  article_id: id, 
                  title: req.body.title, 
                  desc: req.body.desc, 
                  image: req.body.image,
                  src: req.body.src,
                  article_url: req.body.article_url
            }
            let newArticle = await Article(prod)
            
            newArticle.save()
            if (newArticle) {
                  res.status(200).json({ message: "Article created!", article: prod})
                  return
            }
            res.status(400).json({ message: "Please try again!"})
      } catch (error) {
            console.log(error);
            res.status(501).json({ message: "Please try again!" })
      }
}

module.exports = createArticle
