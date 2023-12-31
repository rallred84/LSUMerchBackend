const client = require("./client");

async function createProduct({
  name,
  description,
  price,
  stockQuantity,
  imageURL,
  size,
  category,
  isFeatured,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    INSERT INTO products (name, description, price, "stockQuantity", "imageURL", size, category, "isFeatured")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
    `,
      [
        name,
        description,
        price,
        stockQuantity,
        imageURL,
        size,
        category,
        isFeatured,
      ]
    );

    if (product) {
      return product;
    }
  } catch (err) {
    console.error(err);
  }
}

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(
      `
    SELECT * 
    FROM products 
    `
    );

    return products;
  } catch (err) {
    console.error(err);
  }
}

async function getProductById(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    SELECT * 
    FROM products 
    WHERE id=$1;
    `,
      [id]
    );

    return product;
  } catch (err) {
    console.error(err);
  }
}

async function updateProduct({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [product],
    } = await client.query(
      `
    UPDATE products
    SET ${setString}
    WHERE id=${id}
    RETURNING *;
  `,
      Object.values(fields)
    );

    return product;
  } catch (err) {
    console.error(err);
  }
}

async function destroyProduct(id) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      DELETE FROM products 
      WHERE id=$1
      RETURNING *;
    `,
      [id]
    );

    return product;
  } catch (error) {
    console.error(err);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  destroyProduct,
};
