const client = require('./client');

async function createProduct({ name, description, price, quantity, size }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    INSERT INTO products (name, description, price, quantity, size)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
      [name, description, price, quantity, size]
    );

    if (product) {
      return product;
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = { createProduct };
