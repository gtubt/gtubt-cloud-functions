const { Post } = require("../models");
const utils = require("../utils");

const get_all_posts = async (req, res) => {
  await Post.findAll().then((result) => {
    res.status(200).json(result);
  });
};

const get_post = async (req, res, next) => {
  res.status(200).json(utils.get_response_object(req.post, "Post received.", 200));
};

const create_post = async (req, res, next) => {
  const post_data = req.body;

  await Post.create(post_data)
    .then((result) => {
      res.status(200).json(utils.get_response_object(post_data, "Post successfully created.", 200));
    })
    .catch((error) => {
      res.status(404).json(utils.get_response_object(null, `Post can not be created. Reason: ${error.errors[0].message}`, 404));
    });
};

const update_post = async (req, res, next) => {
  const post = req.post;
  const body = req.body;

  const post_data = {
    title: body.title == null ? post.title : body.title,
    description: body.description == null ? post.description : body.description,
    coverImageUrl: body.coverImageUrl == null ? post.coverImageUrl : body.coverImageUrl,
    summary: body.summary == null ? post.summary : body.summary,
    type: body.type == null ? post.type : body.type,
    startDate: body.startDate == null ? post.startDate : body.startDate,
    endDate: body.endDate == null ? post.endDate : body.endDate,
  };

  await Post.update(post_data, {
    where: {
      id: req.post.id,
    },
  })
    .then((result) => {
      if (result[0] === 0) {
        res.status(404).json(utils.get_response_object(null, "Post can not be updated.", 404));
      } else {
        res.status(200).json(utils.get_response_object(post_data, "Post successfully updated.", 200));
      }
    })
    .catch((error) => {
      res.status(404).json(utils.get_response_object(null, `Post can not be updated. Reason: ${error.errors[0].message}`, 404));
    });
};

const delete_post = async (req, res, next) => {
  await Post.destroy({
    where: {
      id: req.post.id,
    },
  })
    .then((result) => {
      res.status(200).json(utils.get_response_object(null, "Post successfully deleted.", 200));
    })
    .catch((error) => {
      res.status(404).json(utils.get_response_object(null, `Post can not be deleted. Reason: ${error.errors[0].message}`, 404));
    });
};

// export handlers
module.exports = {
  get_all_posts: get_all_posts,
  get_post: get_post,
  create_post: create_post,
  update_post: update_post,
  delete_post: delete_post,
};
