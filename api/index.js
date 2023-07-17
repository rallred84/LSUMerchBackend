const express = require("express");
const apiRouter = express.Router();
const { getUserById } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, STRIPE_KEY } = process.env;
const stripe = require("stripe")(STRIPE_KEY);

//GET /api/health
apiRouter.get("/health", async (req, res) => {
  res.status(200).send({
    message: "Router is healthy",
  });
});

//AUTHENTICATE
// In this section, we will run authentication so that any requests that require user authentication will not have to be recoded each time

apiRouter.use("/", async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.headers.authorization;
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        if (token) req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

//ROUTES
// Will require and use individual routers for each path we set up

//CHECKOUT
//Endpoint for Stripe checkout

apiRouter.post("/checkout", async (req, res) => {
  try {
    console.log("test");
    const { totalPrice, orderId } = req.body;
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: totalPrice,
            product_data: {
              name: "Tiger's Den",
              description: `Order ID: ${orderId}`,
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/confirmation/${orderId}?success=true`,
      cancel_url: `http://localhost:5173/checkout?success=true`,
    });
    console.log(session.url);

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
  }
});

//ROUTER: /api/users
const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

//ROUTER: /api/products
const productsRouter = require("./products");
apiRouter.use("/products", productsRouter);

//ROUTER: /api/reviews
const reviewsRouter = require("./reviews");
apiRouter.use("/reviews", reviewsRouter);

//ROUTER: /api/reviews
const ordersRouter = require("./orders");
apiRouter.use("/orders", ordersRouter);

//ROUTER: /api/orders_products
const orderProductsRouter = require("./orderProducts");
apiRouter.use("/orders_products", orderProductsRouter);

module.exports = apiRouter;

//ERROR HANDLER
//Used to catch and send all errors
//All Errors will have a success: false, and then a specific error name and message depending on the cause of the error. Try to use short, specific, and user friendly error messages that can be used on the front end if needed

apiRouter.use((error, req, res, next) => {
  res.status(401).send({
    success: false,
    error: {
      name: error.name,
      message: error.message,
    },
  });
});
