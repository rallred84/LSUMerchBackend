const client = require("./client");

async function createOrder({ price, hasShipped, isComplete }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
    INSERT INTO orders (price, "hasShipped", "isComplete")
    VALUES ($1, $2, $3)
    RETURNING *
    `,
      [price, hasShipped, isComplete]
    );

    if (order) {
      return order;
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = { createOrder };
