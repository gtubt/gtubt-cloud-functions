const express = require("express");
const body_parser = require("body-parser");
const news_route_param_handlers = require("./news-route-param-handler");
const news_controller = require("../../controllers/news-controller");
const middlewares = require("../../middlewares");

const news_router = express.Router();
const json_parser = body_parser.json();

news_router.param("news", news_route_param_handlers.news_param_handler);

news_router.all("/all/:id?", json_parser, news_controller.get_all_news);
news_router.get("/:news", json_parser, news_controller.get_news);
news_router.post("/", middlewares.restrict_to_admin, json_parser, news_controller.create_news);
news_router.patch("/:news", middlewares.restrict_to_admin, json_parser, news_controller.update_news);
news_router.delete("/:news", middlewares.restrict_to_admin, json_parser, news_controller.delete_news);

module.exports = news_router;
