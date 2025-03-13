const express = require('express');
const authenticateJWT = require('../middlewares/checkToken');
const Photo = require('../models/photo');
const createPhoto = require('../controllers/gallery/create');
const { upload, convertToWebP } = require('../middlewares/uploadImages');
const router = express.Router();

router.post("/", authenticateJWT, upload.single("image"),convertToWebP, createPhoto)
router.get("/", async(req, res) => {
      let allPhotos = await Photo.find({})
      res.status(200).json(allPhotos) 
})
router.get("/:page", async(req, res) => {
      const size = await Photo.estimatedDocumentCount();
      let s = req.params.page
      let allPhotos = await Photo.find()
      .skip(+s*10-10)
      .limit(+s*10+10);
      let pg = size === 0 ? 1 : Math.ceil(size / 10)
      res.status(200).json({data:allPhotos, count: pg}) 
})
module.exports = router