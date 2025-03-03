const multer = require('multer');
const path = require('path');

const uploadsDir = path.join(__dirname, '..', '..', 'public', 'images');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
module.exports = {
      storage, upload
}

