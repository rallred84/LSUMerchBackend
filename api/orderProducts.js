const express = require("express");
const orderProductsRouter = express.Router();
const { requireUser, requireAdmin } = require("./utils");
const {
  addProductToCart,
  deleteProductFromCart,
  changeProductCartQuantity,
} = require("../db");

orderProductsRouter.use((req, res, next) => {
  console.log("Making request to /api/orders_products");
  next();
});

//POST /orders_products

orderProductsRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const newCartProduct = await addProductToCart(req.body);

    //Need to Update Order's Total Price when products are added and removed from the cart

    res.send({
      success: true,
      data: {
        message: `Product Has been added to cart`,
        newCartProduct,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// DELETE /orders_products

orderProductsRouter.delete("/", requireUser, async (req, res, next) => {
  try {
    const deletedCartProduct = await deleteProductFromCart(req.body);

    //Need to Update Order's Total Price when products are added and removed from the cart

    res.send({
      success: true,
      data: {
        message: `Product Has been deleted from cart`,
        deletedCartProduct,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// PATCH /orders_products

orderProductsRouter.patch("/", requireUser, async (req, res, next) => {
  try {
    const updatedCartProduct = await changeProductCartQuantity(req.body);

    //Need to Update Order's Total Price when products are added and removed from the cart

    res.send({
      success: true,
      data: {
        message: `Product Quantity has been updated`,
        updatedCartProduct,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = orderProductsRouter;
