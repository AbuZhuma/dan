const express = require('express');
const authenticateJWT = require('../middlewares/checkToken');
const createTopic = require('../controllers/topic/create');
const Topic = require('../models/topic');
const router = express.Router();

router.post("/", authenticateJWT, createTopic)
router.get("/chosed", async(req, res) => {
      let topic = await Topic.find({})
      res.status(200).json(topic[topic.length-1]) 
})
router.get("/", async(req, res) => {
      let allTopics = await Topic.find({})
      res.status(200).json(allTopics) 
})

module.exports = router