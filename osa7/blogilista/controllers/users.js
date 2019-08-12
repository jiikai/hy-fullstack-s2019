const bcrypt = require('bcrypt'),
  usersRouter = require('express').Router(),
  User = require('../models/user');
  //Blog = require('../models/Blog');

const isValidPassword = str => str && str.length > 2;

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs');
    res.json(users.map(user => user.toJSON()));
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('blogs');
    if (user)
      res.json(user.toJSON());
    else
      res.status(404).end();
  } catch (error) {
    next(error);
  }
});

usersRouter.post('/', async (req, res, next) => {
  const body = req.body;
  if (!isValidPassword(body.password))
    return res.status(400).json({
      error: (!body.password ? 'missing password'
        : 'password length must be at least 3')
    });
  try {
    const hash = await bcrypt.hash(body.password, 10);
    const result = await User.create({
      username: body.username,
      name: body.name,
      passwordHash: hash
    });
    res.status(201).json(result.toJSON());
  } catch (error) {
    next(error);
  }
});

/*
usersRouter.delete('/:id', async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

usersRouter.put('/:id', async (req, res, next) => {
  try {
    const body = req.body;
    const updated = await User.findByIdAndUpdate(req.params.id, {
      author: body.author,
      title: body.title,
      url: body.url,
      likes: body.likes
    }, {
      new: true,
      runValidators: true
    });
    if (updated)
      res.json(updated.toJSON());
    else
      res.status(204).end();
  } catch (error) {
    next(error);
  }
});
*/
module.exports = usersRouter;