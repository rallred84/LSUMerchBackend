const express = require('express');
const apiRouter = express.Router();
const { getUserById } = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

//GET /api/health
apiRouter.get('/health', async (req, res) => {
  res.status(200).send({
    message: 'Router is healthy',
  });
});

//AUTHENTICATE
// In this section, we will run authentication so that any requests that require user authentication will not have to be recoded each time

apiRouter.use('/', async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.headers.authorization;
  if (!auth) {
    next();
  }
});

//ROUTES
// Will require and use individual routers for each path we set up

const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
