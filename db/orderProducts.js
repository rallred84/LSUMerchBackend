const client = require("./client");

async function addProductToCart({ orderId, productId, quantity }) {
  try {
    const {
      rows: [newCartProduct],
    } = await client.query(
      `
            INSERT INTO orders_products ("orderId", "productId", quantity)
            VALUES ($1, $2, $3)
            RETURNING *;
            `,
      [orderId, productId, quantity]
    );
    return newCartProduct;
  } catch (err) {
    console.error(err);
  }
}

async function deleteProductFromCart({ orderId, productId }) {
  try {
    const {
      rows: [deletedCartProduct],
    } = await client.query(
      `
    DELETE FROM orders_products
    WHERE "orderId" = $1 AND "productId" = $2
    RETURNING *
    `,
      [orderId, productId]
    );

    return deletedCartProduct;
  } catch (err) {
    console.error(err);
  }
}

async function changeProductCartQuantity({ orderId, productId, quantity }) {
  try {
    const { rows: updatedCartProduct } = await client.query(
      `
      UPDATE orders_products
      SET "quantity" = $1
      WHERE "orderId" = ${orderId} AND "productId" = ${productId}
      RETURNING *
      `,
      [quantity]
    );

    return updatedCartProduct;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  addProductToCart,
  deleteProductFromCart,
  changeProductCartQuantity,
};
