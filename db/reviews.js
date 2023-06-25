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

module.exports = { createReview };
