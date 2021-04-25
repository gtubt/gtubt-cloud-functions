const { User } = require("../../models");
const utils = require("../../utils");

const user_param_handler = async (req, res, next, value) => {
  if (!isNaN(value)) {
    const user_id = parseInt(value, 10);
    User.findByPk(user_id)
      .then((result) => {
        req.user = result.dataValues;
        next();
      })
      .catch((error) => {
        res.status(404).json(utils.get_response_object(null, "User can not be retrieved.", 404));
      });
  } else {
    User.findOne({
      where: {
        email: value,
      },
    })
      .then((result) => {
        req.user = result.dataValues;
        next();
      })
      .catch((error) => {
        res.status(404).json(utils.get_response_object(null, "User can not be retrieved.", 404));
      });
  }
};

module.exports = {
  user_param_handler: user_param_handler,
};
