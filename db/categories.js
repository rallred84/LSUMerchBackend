const client = require("./client");

async function createCategory({ name, description }) {
  try {
    const {
      rows: [category],
    } = await client.query(
      `
    INSERT INTO categories (name, description)
    VALUES ($1, $2)
    RETURNING *
    `,
      [name, description]
    );

    if (category) {
      return category;
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = { createCategory };
