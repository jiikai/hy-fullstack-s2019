const router = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const Comment = require('../models/comment');

router.post('/reset', async (req, res, next) => {
  try {
    await Comment.deleteMany({});
    await Blog.deleteMany({});
    await User.deleteMany({});
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;