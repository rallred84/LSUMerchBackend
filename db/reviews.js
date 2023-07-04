const client = require("./client");

async function createReview({ creatorId, productId, message, rating }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
    INSERT INTO reviews ("creatorId", "productId", message, rating)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT ("creatorId", "productId") DO NOTHING
    RETURNING *
    `,
      [creatorId, productId, message, rating]
    );

    if (review) {
      return review;
    }
  } catch (err) {
    console.error(err);
  }
}

async function getAllReviews() {
  try {
    const { rows: reviews } = await client.query(
      `
    SELECT * 
    FROM reviews 
    `
    );

    return reviews;
  } catch (err) {
    console.error(err);
  }
}

async function getReviewsByUserId(userId) {
  try {
    const { rows: reviews } = await client.query(
      `
    SELECT * FROM reviews
    WHERE "creatorId" = $1
    `,
      [userId]
    );

    return reviews;
  } catch (err) {
    console.error(err);
  }
}

async function getReviewById(id) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
    SELECT * 
    FROM reviews 
    WHERE id=$1;
    `,
      [id]
    );

    return review;
  } catch (err) {
    console.error(err);
  }
}

async function updateReview({ productId, ...fields }) {
  //Add a check that editer is the same user are the review creator

  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [review],
    } = await client.query(
      `
    UPDATE reviews
    SET ${setString}
    WHERE "productId"=${productId}
    RETURNING *;
  `,
      Object.values(fields)
    );

    return review;
  } catch (err) {
    console.error(err);
  }
}

async function destroyReview(productId) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
      DELETE FROM reviews 
      WHERE "productId"=$1
      RETURNING *;
    `,
      [productId]
    );

    return review;
  } catch (err) {
    console.error(err);
  }
}

//delete from products when table joined
//get reviews by product when tables joined

module.exports = {
  createReview,
  getAllReviews,
  getReviewsByUserId,
  getReviewById,
  updateReview,
  destroyReview,
};
