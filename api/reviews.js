const express = require("express");
const reviewsRouter = express.Router();
const jwt = require("jsonwebtoken");

const { createReview, updateReview, destroyReview } = require("../db");
const { requireUser } = require("./utils");

reviewsRouter.use((req, res, next) => {
  console.log("Making request to /api/reviews");
  next();
});

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

    if (!newReview) {
      next({
        name: "ErrorCreatingReview",
        message:
          "Your review was not created, check to make sure you filled out all fields",
      });
    }
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

  try {
    const updatedReview = await updateReview({
      productId,
      creatorId: req.user.id,
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
        message:
          "There was an error updating this review or you do not have a review for this product",
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
    const deletedReview = await destroyReview({
      productId,
      creatorId: req.user.id,
    });

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
        message:
          "There was an error deleting this review or you do not have a review for this product",
      });
    }
  } catch (err) {
    console.error(err);
  }
});

module.exports = reviewsRouter;
