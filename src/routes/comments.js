const express = require('express');
const authenticateJWT = require('../middlewares/checkToken');
const createComment = require('../controllers/comments/create');
const Comment = require('../models/comments');
const router = express.Router();

router.post("/", authenticateJWT, createComment)
router.get("/", async(req, res) => {
      let allComments = await Comment.find({})
      res.status(200).json(allComments) 
})

module.exports = router