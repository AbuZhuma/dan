const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

const users = require("./src/routes/users")
const articles = require("./src/routes/articles")
const comments = require("./src/routes/comments")
const topic = require("./src/routes/topic")
const gallery = require("./src/routes/gallery")

const rateLimit = require('express-rate-limit');
const path = require('path');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  keyGenerator: (req, res) => req.clientIp,
});
const public = path.join(__dirname, 'public');

app.use(limiter);
app.use(cors());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["*", "'unsafe-inline'", "'unsafe-eval'", "data:", "blob:"],
      scriptSrc: ["*", "'unsafe-inline'", "'unsafe-eval'", "data:", "blob:"],
      imgSrc: ["*", "data:", "blob:"],
      styleSrc: ["*", "'unsafe-inline'"],
      fontSrc: ["*", "data:"],
      connectSrc: ["*", "data:", "blob:"],
      mediaSrc: ["*", "data:", "blob:"],
      objectSrc: ["*"],
      frameSrc: ["*"],
      frameAncestors: ["*"],
    },
  })
);
app.use(express.json());
app.use('/public', express.static(public));

const PORT = process.env.PORT || 5000;
const dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/users/', users)
app.use('/articles/', articles)
app.use('/comments/', comments)
app.use('/topic/', topic)
app.use('/gallery/', gallery)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});