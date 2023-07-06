const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");

const {
  createUser,
  loginUser,
  getOrdersByUserId,
  getCartByUserId,
  getReviewsByUserId,
  updateUser,
} = require("../db");

const { requireUser, requireAdmin } = require("./utils");

usersRouter.use((req, res, next) => {
  console.log("Making request to /api/users");
  next();
});

//POST /users/register

//Register New User

usersRouter.post("/register", async (req, res, next) => {
  try {
    const user = await createUser(req.body);

    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1w" }
      );

      res.send({
        success: true,
        data: {
          message: `Your account has been created ${user.firstName}!`,
          token,
          user,
        },
      });
    } else {
      next({
        name: "UserNotCreated",
        message:
          "There was an error creating your account, please make sure all fields have been filled out",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

//POST / users/login
//Login Existing User

usersRouter.post("/login", async (req, res, next) => {
  try {
    const user = await loginUser(req.body);

    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1w" }
      );

      res.send({
        success: true,
        data: {
          message: "You are logged in!",
          token,
          user,
        },
      });
    } else {
      next({
        name: "WrongEmailOrPassword",
        message: "Email or password is incorrect",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

//GET /users/profile

usersRouter.get("/profile", requireUser, async (req, res, next) => {
  const user = req.user;

  user.orders = (await getOrdersByUserId(user.id)) || [];
  user.reviews = (await getReviewsByUserId(user.id)) || [];
  user.cart = (await getCartByUserId(user.id)) || {};

  //Ask Max how to make sure all the above await functions run before running the following block of code
  for (let order of user.orders) {
    let totalPrice = 0;
    for (let product of order.products) {
      totalPrice =
        totalPrice + Number(product.price.slice(1)) * Number(product.quantity);
    }
    order.price = totalPrice;
  }

  try {
    res.send({
      success: true,
      data: {
        user: user,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

//PATCH /users/profile

usersRouter.patch("/profile", requireUser, async (req, res, next) => {
  const displayName = req.body.firstName
    ? req.body.firstName
    : req.user.firstName;
  try {
    const updatedUser = await updateUser({ userId: req.user.id, ...req.body });
    res.send({
      success: true,
      data: {
        message: `Your account has been updated ${displayName}!`,
        user: updatedUser,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = usersRouter;
