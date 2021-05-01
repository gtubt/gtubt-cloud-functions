const { News } = require("../../models");
const utils = require("../../utils");

const news_param_handler = async (req, res, next, value) => {
  if (!isNaN(value)) {
    const news_id = parseInt(value, 10);
    Event.findByPk(news_id)
      .then((result) => {
        req.news = result.dataValues;
        next();
      })
      .catch(() => {
        res.status(404).json(utils.get_response_object(null, "Event can not be retrieved.", 404));
      });
  } else {
    res.status(404).json(utils.get_response_object(null, "No news ID provided.", 404));
  }
};

module.exports = {
  news_param_handler: news_param_handler,
};
