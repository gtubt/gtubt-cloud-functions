const { User } = require("../../models");
const utils = require("../../utils");

const user_param = async (req, res, next, value) => {
  let user;

  if (!isNaN(value)) {
    const user_id = parseInt(value, 10);
    user = await User.findByPk(user_id);

  } else {
    user = await User.findOne({
      where: {
        email: value
      }
    });
  }

  if (user === null) {
    res.status(404).json(utils.getResponseObj(null, "User can not be retrieved.", 404));
  } else {
    req.user = user;
    next();
  }
};

module.exports = {
  user_param: user_param
};