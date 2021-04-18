const { User } = require("./models");
const admin = require("firebase-admin");
const utils = require("./utils");

function restrict_to_admin(req, res, next) {
  // TODO: Implement
  next();
}

function validate_user(req, res, next) {
  const firebaseToken = req.get("x-firebase-token");
  if (firebaseToken) {
    // Try to verify firebase token.
    admin
      .auth()
      .verifyIdToken(firebaseToken)
      .then((decodedToken) => {
        // If firebase token is verified, obtain the user with matching email from database
        // and attach it to request.
        User.findOne({ where: { email: decodedToken.email } })
          .then((firebase_user) => {
            req.firebase_user = firebase_user.dataValues;
            next();
          })
          .catch((error) => {
            // If database doesn't contain a user with token's email, don't attach firebase_user to request.
            next();
          });
      })
      .catch((error) => {
        // If firebase token can not be verified, don't attach firebase_user to request.
        next();
      });
  } else {
    // No firebase user token, attaching nothing to request.firebase_user.
    next();
  }
}

function restrict_to_self(req, res, next) {
  // Check if the request has an attached firebase user and if so, check if the IDs match.
  if (req.firebase_user && req.firebase_user.id == req.user.id) {
    next();
  } else {
    res.status(401).json(utils.get_response_object(null, `Can not access to unauthorized endpoint.`));
  }
}

module.exports = {
  validate_user: validate_user,
  restrict_to_admin: restrict_to_admin,
  restrict_to_self: restrict_to_self,
};
