const multer = require('multer');
const sharp = require('sharp');
const path = require('path');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const convertToWebP = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const fileName = Date.now() + '.webp'; 
  const outputPath = path.join(__dirname, '..', '..', 'public', 'images', fileName); 

  sharp(req.file.buffer) 
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(() => {
      req.file.path = outputPath;
      req.file.filename = fileName;

      next();
    })
    .catch((err) => {
      console.error('Ошибка при преобразовании изображения:', err);
      next(err);
    });
};

module.exports = {
  upload,
  convertToWebP,
};