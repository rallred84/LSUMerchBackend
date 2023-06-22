const express = require('express');
const apiRouter = express.Router();

//GET /api/health
apiRouter.get('/health', async (req, res) => {
  res.status(200).send({
    message: 'Router is healthy',
  });
});

//AUTHENTICATE
// In this section, we will run authentication so that any requests that require user authentication will not have to be recoded each time

//ROUTES
// Will require and use individual routers for each path we set up

module.exports = apiRouter;
