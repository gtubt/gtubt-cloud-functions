const express = require("express");
const body_parser = require("body-parser");
const posts_route_param_handlers = require("./posts-route-param-handler");
const posts_controller = require("../../controllers/posts-controller");
const middlewares = require("../../middlewares");

const post_router = express.Router();
const json_parser = body_parser.json();

post_router.param("post", posts_route_param_handlers.post_param_handler);

post_router.all("/all/:id?", middlewares.restrict_to_self, json_parser, posts_controller.get_all_posts);
post_router.get("/:post", middlewares.restrict_to_self, json_parser, posts_controller.get_post);
post_router.post("/", middlewares.restrict_to_admin, json_parser, posts_controller.create_post);
post_router.patch("/:post", middlewares.restrict_to_admin, json_parser, posts_controller.update_post);
post_router.delete("/:post", middlewares.restrict_to_admin, json_parser, posts_controller.delete_post);

module.exports = post_router;
