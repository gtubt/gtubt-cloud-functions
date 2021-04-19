const { News } = require("../models");
const utils = require("../utils");

const get_all_news = async (req, res) => {
  await News.findAll().then((result) => {
    res.status(200).json(result);
  });
};

const get_news = async (req, res, next) => {
  res.status(200).json(utils.get_response_object(req.news, "News received.", 200));
};

const create_news = async (req, res, next) => {
  const news_data = req.body;

  await News.create(news_data)
    .then((result) => {
      res.status(200).json(utils.get_response_object(result, "News successfully created.", 200));
    })
    .catch((error) => {
      res.status(404).json(utils.get_response_object(null, `News can not be created. Reason: ${error.errors[0].message}`, 404));
    });
};

const update_news = async (req, res, next) => {
  const news = req.news;
  const body = req.body;

  const news_data = {
    title: body.title == null ? news.title : body.title,
    body: body.body == null ? news.body : body.body,
    coverImageUrl: body.coverImageUrl == null ? news.coverImageUrl : body.coverImageUrl,
    summary: body.summary == null ? news.summary : body.summary,
    type: body.type == null ? news.type : body.type,
    startDate: body.startDate == null ? news.startDate : body.startDate,
    endDate: body.endDate == null ? news.endDate : body.endDate,
  };

  await News.update(news_data, {
    where: {
      id: req.news.id,
    },
  })
    .then((result) => {
      if (result[0] === 0) {
        res.status(404).json(utils.get_response_object(null, "News can not be updated.", 404));
      } else {
        res.status(200).json(utils.get_response_object(news_data, "News successfully updated.", 200));
      }
    })
    .catch((error) => {
      res.status(404).json(utils.get_response_object(null, `News can not be updated. Reason: ${error.errors[0].message}`, 404));
    });
};

const delete_news = async (req, res, next) => {
  await News.destroy({
    where: {
      id: req.news.id,
    },
  })
    .then((result) => {
      res.status(200).json(utils.get_response_object(null, "News successfully deleted.", 200));
    })
    .catch((error) => {
      res.status(404).json(utils.get_response_object(null, `News can not be deleted. Reason: ${error.errors[0].message}`, 404));
    });
};

// export handlers
module.exports = {
  get_all_news: get_all_news,
  get_news: get_news,
  create_news: create_news,
  update_news: update_news,
  delete_news: delete_news,
};
