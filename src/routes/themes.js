const express = require('express');
const authenticateJWT = require('../middlewares/checkToken');
const createTheme = require('../controllers/themes/create');
const Themes = require('../models/themes');
const router = express.Router();

router.post("/", authenticateJWT, createTheme)

router.get("/", async(req, res) => {
      const allThemes = await Themes.find({})
      res.status(200).json(allThemes[allThemes.length-1]) 
})

module.exports = router