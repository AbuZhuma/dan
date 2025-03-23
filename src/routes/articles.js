const express = require('express');
const authenticateJWT = require('../middlewares/checkToken');
const { upload } = require('../middlewares/uploadImages');
const createArticle = require('../controllers/articles/create');
const Article = require('../models/article');
const getArticleForId = require('../controllers/articles/getForId');
const searchArticle = require('../controllers/articles/searchProducts');
const editArticle = require('../controllers/articles/putch');
const genArticle = require('../middlewares/genArticle');
const router = express.Router();

router.post("/", authenticateJWT, genArticle, createArticle)
router.put("/:id", authenticateJWT, genArticle, editArticle)
router.get("/id/:id", getArticleForId)
router.get("/q/:srch", searchArticle)
router.get("/", async(req, res) => {
      let allArticles = await Article.find({})
      res.status(200).json(allArticles) 
})
router.get("/:page", async(req, res) => {
      const size = await Article.estimatedDocumentCount();
      let s = req.params.page
      let allArticles = await Article.find()
      let snd = allArticles.reverse().slice(+s*10-10, +s*10+10)
      let pg = size === 0 ? 1 : Math.ceil(size / 10)
      res.status(200).json({data:snd, count: pg}) 
})

module.exports = router