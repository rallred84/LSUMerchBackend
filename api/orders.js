const express = require("express");
const ordersRouter = express.Router();
const { requireUser, requireAdmin } = require("./utils");
const { addProductsToOrder } = require("../db/utils");
const {
  getAllOrders,
  getOrdersByUserId,
  createOrder,
  updateOrder,
  getUserById,
  getOrderById,
  getCartByUserId,
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
      console.log(usersOrders);
      if (usersOrders[0]) {
        res.send({
          success: true,
          data: {
            orders: usersOrders,
          },
        });
      } else {
        next({
          name: "NoOrdersExist",
          message: "No orders exist for that user",
        });
      }
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
    const newCart = await createOrder({ userId: req.user.id });
    if (newCart) {
      res.send({
        success: true,
        data: {
          message: "New Persistant Cart Created",
          cart: newCart,
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

ordersRouter.patch("/place", requireUser, async (req, res, next) => {
  try {
    const orderToUpdate = await getCartByUserId(req.user);

    if (!orderToUpdate) {
      next({
        name: "OrderDoesNotExist",
        message: "There is no open cart for this user",
      });
    }

    await updateOrder({
      id: orderToUpdate.id,
      orderStatus: "Order Placed",
    });

    orderToUpdate.orderStatus = "Order Placed";

    res.send({
      success: true,
      data: {
        message: "Order has been placed",
        order: orderToUpdate,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// PATCH /orders/:orderId/complete

ordersRouter.patch(
  "/:orderId/complete",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    const { orderId } = req.params;

    try {
      const orderToUpdate = await getOrderById(orderId);
      if (!orderToUpdate) {
        return next({
          name: "OrderDoesNotExist",
          message: "There is no order that matches the given order ID",
        });
      }

      if (orderToUpdate.orderStatus === "Order Complete") {
        next({
          name: "OrderAlreadyCompleted",
          message: "Order has already been marked as completed",
        });
      }

      const completedOrder = await updateOrder({
        id: orderId,
        orderStatus: "Order Complete",
      });

      await addProductsToOrder({ order: completedOrder });

      res.send({
        success: true,
        data: {
          message: "Order has been shipped/completed",
          order: completedOrder,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }
);

ordersRouter;

module.exports = ordersRouter;
