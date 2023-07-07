const express = require("express");
const ordersRouter = express.Router();
const { requireUser, requireAdmin } = require("./utils");
const {
  getAllOrders,
  getOrdersByUserId,
  createOrder,
  updateOrder,
  getUserById,
} = require("../db");

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
    const user = await getUserById(userId);
    try {
      const usersOrders = await getOrdersByUserId(user);
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
    if (newOrder) {
      res.send({
        success: true,
        data: {
          message: "New Persistant Cart Created",
          order: newOrder,
        },
      });
    } else {
      next({
        message: "Cart already exists for this user",
        name: "CartNotCreated",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

// PATCH /orders/:orderId/place

ordersRouter.patch("/:orderId/place", async (req, res, next) => {
  const { orderId } = req.params;
  const placedOrder = await updateOrder({
    id: orderId,
    orderStatus: "Order Placed",
  });

  res.send({
    success: true,
    data: {
      message: "Order has been placed",
      order: placedOrder,
    },
  });
});

// PATCH /orders/:orderId/complete

ordersRouter.patch("/:orderId/complete", async (req, res, next) => {
  const { orderId } = req.params;
  const completedOrder = await updateOrder({
    id: orderId,
    orderStatus: "Order Complete",
  });

  res.send({
    success: true,
    data: {
      message: "Order has been shipped/completed",
      order: completedOrder,
    },
  });
});

ordersRouter;

module.exports = ordersRouter;
