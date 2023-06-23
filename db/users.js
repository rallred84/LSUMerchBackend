const client = require('./client');
const bcrypt = require('bcrypt');

async function createUser({
  username,
  password,
  firstName,
  lastName,
  isAdmin,
}) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [newUser],
  } = await client.query(
    `
        INSERT INTO users (username, password, "firstName", "lastName", "isAdmin")
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
        `,
    [username, hashedPassword, firstName, lastName, isAdmin]
  );

  if (newUser) {
    delete newUser.password;
    return newUser;
  }
}

module.exports = {
  createUser,
};
