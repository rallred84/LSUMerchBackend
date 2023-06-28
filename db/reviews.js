const client = require("./client");

async function createReview({ message, rating }) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
    INSERT INTO reviews (message, rating)
    VALUES ($1, $2)
    RETURNING *
    `,
      [message, rating]
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

async function updateReview({ id, ...fields }) {
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
    UPDATE products
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
  `,
      Object.values(fields)
    );

    return review;
  } catch (error) {
    console.error(err);
  }
}

async function destroyReview(id) {
  try {
    const {
      rows: [review],
    } = await client.query(
      `
      DELETE FROM reviews 
      WHERE id=$1
      RETURNING *;
    `,
      [id]
    );

    return review;
  } catch (error) {
    console.error(err);
  }
}

//delete from products when table joined
//get reviews by product when tables joined

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  destroyReview,
};
