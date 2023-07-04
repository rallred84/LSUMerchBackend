const express = require("express");
const reviewsRouter = express.Router();
const jwt = require("jsonwebtoken");

const {
  createReview,
  getReviewById,
  updateReview,
  destroyReview,
} = require("../db");
const { requireUser } = require("./utils");

// GET /reviews/:productId
//join prodId to products to get reviews for product

// POST /reviews/:productId

reviewsRouter.post("/:productId", requireUser, async (req, res, next) => {
  const { productId } = req.params;
  const { message, rating } = req.body;
  try {
    const newReview = await createReview({
      creatorId: req.user.id,
      productId,
      message,
      rating,
    });
    res.send({
      success: true,
      data: {
        message: "Your review has been submitted",
        review: newReview,
      },
    });
  } catch (err) {
    console.error(err);
  }
});

// PATCH /reviews/:productId

reviewsRouter.patch("/:productId", requireUser, async (req, res, next) => {
  const { productId } = req.params;
  const { message, rating } = req.body;

  try {
    const updatedReview = await updateReview({
      productId,
      ...req.body,
    });

    if (updatedReview) {
      res.send({
        success: true,
        data: {
          message: "Your review has been updated",
          updatedReview,
        },
      });
    } else {
      next({
        name: "ReviewError",
        message: "Review didn't update",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

// DELETE /reviews/:productId

reviewsRouter.delete("/:productId", requireUser, async (req, res, next) => {
  const { productId } = req.params;

  try {
    const deletedReview = await destroyReview(productId);

    if (deletedReview) {
      res.send({
        success: true,
        data: {
          message: "Your review has been removed",
          review: deletedReview,
        },
      });
    } else {
      next({
        name: "ReviewError",
        message: "Review didn't update",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = reviewsRouter;