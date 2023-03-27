const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response, next) => {
  const { name, username, password } = request.body;

  const passwordHash = await bcrypt.hash(password, 10);
  const user = new User({
    name: name,
    username: username,
    password: passwordHash,
  });
  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;