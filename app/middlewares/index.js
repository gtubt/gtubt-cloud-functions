function isAdmin(req, res, next) {
//  TODO: implement
  next();
}

function andRestrictToSelf(req, res, next) {
  // TODO: refactor it
  next();
  // If our authenticated user is the user we are viewing
  // then everything is fine :)
  // if (req.authenticatedUser.id === req.user.id) {
  //   next();
  // } else {
  //   // You may want to implement specific exceptions
  //   // such as UnauthorizedError or similar so that you
  //   // can handle these can be special-cased in an error handler
  //   // (view ./examples/pages for this)
  //   next(new Error('Unauthorized'));
  // }
}

module.exports = {
  andRestrictToSelf: andRestrictToSelf,
  isAdmin: isAdmin
};