const client = require("./client");

async function addProductsToOrder({ order }) {
  const { rows: products } = await client.query(
    `
        SELECT p.id, name, description, price, size, "imageURL", quantity
        FROM products p JOIN orders_products ON p.id = "productId"
        WHERE "orderId" = $1;
  `,
    [order.id]
  );

  order.products = products || [];

  return order;
}

module.exports = { addProductsToOrder };
