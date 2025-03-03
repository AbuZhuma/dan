const jwt = require('jsonwebtoken');
require('dotenv').config();  

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  const SECRET_KEY = process.env.SECRET_KEY;

  if (!token) {
    return res.status(403).json({ message: 'Access Denied. No token provided.' });
  }

  if (!SECRET_KEY) {
    return res.status(500).json({ message: 'Server error: SECRET_KEY is not defined.' });
  }
  
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    req.user = user;
    next();  
  });
};

module.exports = authenticateJWT;
