const Article = require("../../models/article")

const editArticle = async(req, res) => {
      try {
            let artcleId = req.params.id
            let artcle = await Article.findOneAndUpdate({article_id: artcleId}, req.body)
            artcle.save()
            res.status(200).json({
                  message: "Article updated!"
            })
      } catch (error) {
            console.log(error);
            res.status(501).json({message: "Please try again!"})
      }
}

module.exports = editArticle