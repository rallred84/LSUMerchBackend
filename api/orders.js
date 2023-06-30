const express = require("express");
const ordersRouter = express.Router();
const { requireUser, requireAdmin } = require("./utils");
const { getAllOrders, getOrdersByUserId, createOrder } = require("../db");

ordersRouter.use((req, res, next) => {
  console.log("Making request to /api/orders");
  next();
});

// GET /orders

ordersRouter.get("/", async (req, res, next) => {
  try {
    const allOrders = await getAllOrders();
    res.send({
      success: true,
      data: {
        orders: allOrders,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// GET /orders/:userId

ordersRouter.get(
  "/:userId",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    const { userId } = req.params;
    try {
      const usersOrders = await getOrdersByUserId(userId);
      res.send({
        success: true,
        data: {
          orders: usersOrders,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }
);

// POST /orders

//All orders will initially be created as a cart
//When end users place an order, the order will be converted to "Order Placed" and added to user
//When admin ships order, the order will be converted to "Order Complete"

ordersRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const newOrder = await createOrder({ userId: req.user.id });
    res.send({
      success: true,
      data: {
        message: "New Persistant Cart Created",
        order: newOrder,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// PATCH /orders/:orderId

module.exports = ordersRouter;
