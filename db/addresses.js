const client = require("./client");

async function createAddress({ street, city, state, zip }) {
  try {
    const {
      rows: [address],
    } = await client.query(
      `
    INSERT INTO addresses (street, city, state, zip)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
      [street, city, state, zip]
    );

    if (address) {
      return address;
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = { createAddress };
