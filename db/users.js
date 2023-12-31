const client = require("./client");
const bcrypt = require("bcrypt");

async function createUser({ email, password, firstName, lastName, isAdmin }) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const {
      rows: [newUser],
    } = await client.query(
      `
        INSERT INTO users (email, password, "firstName", "lastName", "isAdmin")
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (email) DO NOTHING
        RETURNING *;
        `,
      [email.toLowerCase(), hashedPassword, firstName, lastName, isAdmin]
    );

    if (newUser) {
      delete newUser.password;
      return newUser;
    }
  } catch (err) {
    console.error(err);
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users
      WHERE email = $1
      `,
      [email.toLowerCase()]
    );

    if (user) {
      delete user.password;
      return user;
    }
  } catch (err) {
    console.error(err);
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users
      WHERE id = $1
      `,
      [userId]
    );

    if (user) {
      delete user.password;
      return user;
    }
  } catch (err) {
    console.error(err);
  }
}

async function loginUser({ email, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT * FROM users
    WHERE email = $1
  `,
      [email]
    );

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (passwordsMatch) {
      delete user.password;
      return user;
    }
  } catch (err) {
    console.error(err);
  }
}

async function updateUser({ userId, ...updateFields }) {
  const setString = Object.keys(updateFields)
    .map((key, idx) => `"${key}" = $${idx + 1}`)
    .join(", ");

  try {
    const {
      rows: [updatedUser],
    } = await client.query(
      `
      UPDATE users
      SET ${setString}
      WHERE id = ${userId}
      RETURNING *;
    `,
      Object.values(updateFields)
    );

    return updatedUser;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  createUser,
  getUserById,
  loginUser,
  updateUser,
  getUserByEmail,
};
