const jwt = require('jsonwebtoken'),
  bcrypt = require('bcrypt'),
  loginRouter = require('express').Router(),
  User = require('../models/user');

loginRouter.post('/', async (req, res, next) => {
  try {
    const body = req.body;
    if (!body || !body.username || !body.password)
      return res.status(401).json({
        error: 'missing username or password'
      });

    const user = await User.findOne({username: body.username});
    if (!user || !(await bcrypt.compare(body.password, user.passwordHash)))
      return res.status(401).json({
        error: 'invalid username or password'
      });

    res.status(200).send({
      token: jwt.sign({
        username: user.username,
        id: user._id,
      }, process.env.SECRET),
      username: user.username,
      name: user.name,
      id: user._id
    });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;