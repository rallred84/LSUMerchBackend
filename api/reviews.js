const express = require("express");
const reviewsRouter = express.Router();
const jwt = require("jsonwebtoken");
const { createReview } = require("../db");

// POST /reviews/:productId

reviewsRouter.post("/:productId", async (req, res, next) => {
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

// DELETE /reviews/:productId

module.exports = reviewsRouter;
