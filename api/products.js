const express = require("express");
const productsRouter = express.Router();

const { getAllProducts, createProduct } = require("../db");

const { requireUser, requireAdmin } = require("./utils");

productsRouter.use((req, res, next) => {
  console.log("Making request to /api/products");
  next();
});

// GET /products

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    console.log(products);

    if (products) {
      res.send({
        success: true,
        data: {
          products,
        },
      });
    } else {
      next({
        name: "NoProducts",
        message: "No Products found",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

// POST /products

productsRouter.post("/", requireUser, requireAdmin, async (req, res, next) => {
  try {
    const product = await createProduct(req.body);
    if (req.user) {
      res.send({
        success: true,
        data: {
          product,
        },
      });
    } else {
      next({
        name: "UnauthorizedError",
        message: "You must be logged in to perform this action",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = productsRouter;
