const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', [
      'username', 'name', 'id'
    ]).populate('comments');
    res.json(blogs.map(blog => blog.toJSON()));
  } catch (error) {
    next(error);
  }
});

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('user', [
      'username', 'name', 'id'
    ]).populate('comments');
    if (blog)
      res.json(blog.toJSON());
    else
      res.status(404).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    const decodedToken = jwt.verify(req.token, process.env.SECRET);
    if (!req.token || !decodedToken.id)
      return res.status(401).json({error: 'token missing or invalid'});
    const user = await User.findById(decodedToken.id);
    const created = await Blog.create({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    });
    const result =  await Blog.findById(created._id).populate('user', [
      'username', 'name', 'id'
    ]).populate('comments');
    user.blogs = [...user.blogs, result._id];
    await user.save();
    res.status(201).json(result.toJSON());
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/:id/comments', async (req, res, next) => {
  try {
    const content = req.body.content;
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      const created = await Comment.create({
        content, blog: blog._id
      });
      blog.comments = [...blog.comments, created._id];
      await blog.save();
      res.status(201).json(created.toJSON());
    } else
      res.status(404);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      if (blog.user) {
        const decodedToken = jwt.verify(req.token, process.env.SECRET);
        if (!req.token || !decodedToken.id)
          return res.status(401).json({error: 'token missing or invalid'});
        if (blog.user.toString() !== decodedToken.id.toString())
          return res.status(401)
            .json({error: 'token does not match blog user id'});
        const user = await User.findById(decodedToken.id);
        user.blogs = user.blogs.filter(blogId => blogId !== req.params.id);
        await user.save();
      }
      await Blog.findByIdAndDelete(req.params.id);
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    console.log(req.params.id, req.body);
    const body = req.body;
    const blog = await Blog.findById(req.params.id).populate('user', {
      username: true, name: true, id: true
     }).populate('comments');
    let updated;
    if (!req.token) {
      blog.likes = body.likes;
      await blog.save();
      updated = blog;
    } else if (req.token) {
      const decodedToken = jwt.verify(req.token, process.env.SECRET);
      if (!decodedToken.id)
        return res.status(401).json({error: 'invalid token'});
      const user = await User.findById(decodedToken.id);
      if (user) {
        if (user._id.toString() !== decodedToken.id.toString())
          return res.status(403)
            .json({error: 'token does not match blog user id'});
        updated = await Blog.findByIdAndUpdate(blog._id, {
          author: body.author,
          title: body.title,
          url: body.url,
          likes: body.likes,
          user: user._id
        }, {
          new: true
        });
        updated.user = blog.user;
      }
    } else
        return res.status(401).json({error: 'missing token'});
    if (updated) {
     res.json(updated.toJSON());
    } else
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;