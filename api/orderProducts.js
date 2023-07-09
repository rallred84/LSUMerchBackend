const express = require("express");
const orderProductsRouter = express.Router();
const { requireUser, updateCartPrice } = require("./utils");
const {
  addProductToCart,
  deleteProductFromCart,
  changeProductCartQuantity,
  getCartByUserId,
  updateOrder,
} = require("../db");

orderProductsRouter.use((req, res, next) => {
  console.log("Making request to /api/orders_products");
  next();
});

//POST /orders_products/add

orderProductsRouter.post("/add", requireUser, async (req, res, next) => {
  try {
    const cartToUpdate = await getCartByUserId(req.user);

    if (!cartToUpdate) {
      return next({
        name: "NoCartExists",
        message: "No cart exists for user",
      });
    }

    let productAlreadyInCart = false;

    cartToUpdate.products.map((product) => {
      if (product.id === req.body.productId) {
        productAlreadyInCart = true;
      }
    });

    if (productAlreadyInCart) {
      return next({
        name: "ProductAlreadyAdded",
        message:
          "This product has already been added to your cart. Visit your cart to update the quantity",
      });
    }

    await addProductToCart({ orderId: cartToUpdate.id, ...req.body });

    const updatedCart = await updateCartPrice({
      orderId: cartToUpdate.id,
      user: req.user,
    });

    res.send({
      success: true,
      data: {
        message: `Product Has been added to cart`,
        cart: updatedCart,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// PATCH /orders_products/update

orderProductsRouter.patch("/update", requireUser, async (req, res, next) => {
  try {
    const cartToUpdate = await getCartByUserId(req.user);

    if (!cartToUpdate) {
      return next({
        name: "NoCartExists",
        message: "No cart exists for user",
      });
    }

    let productAlreadyInCart = false;

    cartToUpdate.products.map((product) => {
      if (product.id === req.body.productId) {
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      return next({
        name: "ItemNotFound",
        message: "This product is not in your cart, please add it to your cart",
      });
    }

    await changeProductCartQuantity({
      orderId: cartToUpdate.id,
      ...req.body,
    });

    const updatedCart = await updateCartPrice({
      orderId: cartToUpdate.id,
      user: req.user,
    });

    res.send({
      success: true,
      data: {
        message: `Product Quantity has been updated`,
        cart: updatedCart,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// DELETE /orders_products/remove

orderProductsRouter.delete("/remove", requireUser, async (req, res, next) => {
  try {
    const cartToUpdate = await getCartByUserId(req.user);

    if (!cartToUpdate) {
      return next({
        name: "NoCartExists",
        message: "No cart exists for user",
      });
    }

    let productAlreadyInCart = false;

    cartToUpdate.products.map((product) => {
      if (product.id === req.body.productId) {
        productAlreadyInCart = true;
      }
    });

    if (!productAlreadyInCart) {
      return next({
        name: "ItemNotFound",
        message: "This product has already been removed from your cart",
      });
    }

    await deleteProductFromCart({ orderId: cartToUpdate.id, ...req.body });

    const updatedCart = await updateCartPrice({
      orderId: cartToUpdate.id,
      user: req.user,
    });

    res.send({
      success: true,
      data: {
        message: `Product Has been deleted from cart`,
        cart: updatedCart,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = orderProductsRouter;
