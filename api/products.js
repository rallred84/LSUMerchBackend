const express = require("express");
const productsRouter = express.Router();

const {
  getAllProducts,
  createProduct,
  updateProduct,
  destroyProduct,
} = require("../db");

const { requireUser, requireAdmin } = require("./utils");

productsRouter.use((req, res, next) => {
  console.log("Making request to /api/products");
  next();
});

// GET /products

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();

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

    if (req.user.isAdmin) {
      res.send({
        success: true,
        data: {
          message: `${product.name} added to inventory`,
          product,
        },
      });
    } else {
      next({
        name: "UnauthorizedError",
        message: "You must be Admin to perform this action",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

// PATCH /products/:productId

productsRouter.patch(
  "/:productId",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    const { productId } = req.params;

    try {
      const updatedProduct = await updateProduct({
        id: productId,
        ...req.body,
      });

      if (req.user.isAdmin) {
        res.send({
          success: true,
          data: {
            message: `${updatedProduct.name} has been updated`,
            product: updatedProduct,
          },
        });
      } else {
        next({
          name: "UnauthorizedError",
          message: "You must be Admin to perform this action",
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
);

// DELETE /products/:productId

productsRouter.delete(
  "/:productId",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    const { productId } = req.params;

    try {
      const deletedProduct = await destroyProduct(productId);

      if (req.user.isAdmin) {
        res.send({
          success: true,
          data: {
            message: `${deletedProduct.name} has been deleted from inventory`,
            product: deletedProduct,
          },
        });
      } else {
        next({
          name: "UnauthorizedError",
          message: "You must be Admin to perform this action",
        });
      }
    } catch (err) {
      console.error(err);
    }
  }
);

module.exports = productsRouter;
