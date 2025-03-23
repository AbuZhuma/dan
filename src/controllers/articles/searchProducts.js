const Article = require("../../models/article");

const searchArticle = async (req, res) => {
      try {
            let srch = req.params.srch.toLowerCase()
            const articles = await Article.find();
            let resp = articles.filter((el) => {
                  if(el.title.toLowerCase().includes(srch) || el.desc.toLowerCase().includes(srch) || el.src.toLowerCase().includes(srch)){
                        return el
                  }
            })
            res.status(200).json(resp)
      } catch (error) {
            console.log(error);
            res.status(501).json({ message: "Please try again!" })
      }
}
module.exports = searchArticle 