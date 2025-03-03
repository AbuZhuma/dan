const generateRandomID = require("../../helpers/genIdH");
const Photo = require("../../models/photo");

const createPhoto = async(req, res) => {
      try {
            if (!req.file) {
                  return res.status(400).json({ message: 'No files uploaded.' });
            }
            const URL = process.env.URL;
            let id = await generateRandomID(10)
            const prodImage = {
                  id: id,
                  filename: req.file.filename,
                  originalname: req.file.originalname,
                  size: req.file.size,
                  path: req.file.path,
                  url: `${URL}/public/images/${req.file.filename}`,
                  title: req.body.title
            }
            const newPhoto = new Photo(prodImage)
            newPhoto.save()
            res.status(200).json({
                  message: "Photo created!", 
                  image: prodImage
            })
      } catch (error) {
            console.log(error);
            res.status(501).json({ message: "Please try again!" })
      }
}

module.exports = createPhoto