const { Post } = require("../../models");
const utils = require("../../utils");

const post_param_handler = async (req, res, next, value) => {
  let post;

  if (!isNaN(value)) {
    const post_id = parseInt(value, 10);
    post = await Post.findByPk(post_id);
  }

  if (post === null) {
    res.status(404).json(utils.get_response_object(null, "Post can not be retrieved.", 404));
  } else {
    req.post = post;
    next();
  }
};

module.exports = {
  post_param_handler: post_param_handler,
};
