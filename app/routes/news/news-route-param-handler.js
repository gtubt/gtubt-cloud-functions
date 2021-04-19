const { News } = require("../../models");
const utils = require("../../utils");

const news_param_handler = async (req, res, next, value) => {
  let news;

  if (!isNaN(value)) {
    const news_id = parseInt(value, 10);
    news = await News.findByPk(news_id);
  }

  if (news === null) {
    res.status(404).json(utils.get_response_object(null, "News can not be retrieved.", 404));
  } else {
    req.news = news;
    next();
  }
};

module.exports = {
  news_param_handler: news_param_handler,
};
