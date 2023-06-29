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

module.exports = {
  requireUser,
  requireAdmin,
};
