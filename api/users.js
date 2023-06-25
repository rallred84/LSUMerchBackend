const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');

const { loginUser } = require('../db');

usersRouter.use((req, res, next) => {
  console.log('Making request to /api/users');
  next();
});

//POST /api/users
//Login Existing user

usersRouter.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await loginUser(username, password);

    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          username,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1w' }
      );

      res.send({
        success: true,
        message: 'You are logged in!',
        token,
        user,
      });
    }
    next();
  } catch (err) {
    console.error(err);
  }
});

module.exports = usersRouter;
