const Article = require("../../models/article");

const getArticleForId = async(req, res) => {
      try {
            let id = req.params.id
            let article = await Article.findOne({article_id: id})
            res.status(200).json(article)
      } catch (error) {
            console.log(error);
            res.status(501).json({message: "Please try again!"})
      }
}
module.exports = getArticleForId