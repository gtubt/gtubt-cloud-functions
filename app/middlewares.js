function restrict_to_admin(req, res, next) {
  // TODO: Implement
  next();
}

function restrict_to_self(req, res, next) {
  // TODO: Implement
  next();
}

module.exports = {
  restrict_to_admin: restrict_to_admin,
  restrict_to_self: restrict_to_self,
};
