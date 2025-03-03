const Article = require("../../models/article");

const searchArticle = async (req, res) => {
      try {
            let srch = req.params.srch.split("&").map((el) => el.split(":"))
            const query = {};
            srch.forEach(([key, value]) => {
                  query[key] = { $regex: value, $options: 'i' };
            });
            const articles = await Article.find(query);
            res.status(200).json(articles)
      } catch (error) {
            console.log(error);
            res.status(501).json({ message: "Please try again!" })
      }
}
module.exports = searchArticle