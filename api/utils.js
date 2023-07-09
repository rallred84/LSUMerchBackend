const { getCartByUserId, updateOrder } = require("../db");

function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: "AuthorizationHeaderError",
      message: "You must be logged in to perform this action",
    });
  }

  next();
}

function requireAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    next({
      name: "AuthorizationHeaderError",
      message: "You must be Admin to perform this action",
    });
  }
  next();
}

async function updateCartPrice({ orderId, user }) {
  const cartToUpdate = await getCartByUserId(user);

  let totalPrice = 0;
  for (let product of cartToUpdate.products) {
    totalPrice =
      totalPrice + Number(product.price.slice(1)) * Number(product.quantity);
  }
  const updatedCart = await updateOrder({ id: orderId, totalPrice });

  updatedCart.products = cartToUpdate.products;

  return updatedCart;
}

module.exports = {
  requireUser,
  requireAdmin,
  updateCartPrice,
};
