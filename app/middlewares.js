const admin = require("firebase-admin");
const utils = require("./utils");

function restrict_to_admin(req, res, next) {
  // TODO: Implement
  next();
}

function restrict_to_self(req, res, next) {
  const firebaseToken = req.get("x-firebase-header");
  admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.uid = decodedToken;
      next();
    })
    .catch((error) => {
      res.status(404).json(utils.get_response_object(null, `Unable to verify ID token. Reason: ${error.message}`, 404));
    });
}

module.exports = {
  restrict_to_admin: restrict_to_admin,
  restrict_to_self: restrict_to_self,
};
