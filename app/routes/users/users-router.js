const express = require("express");
const body_parser = require("body-parser");
const users_route_param_handlers = require("./users-route-param-handlers");
const users_controller = require("../../controllers/users-controller");
const middlewares = require("../../middlewares");

const user_router = express.Router();
const json_parser = body_parser.json();
const raw_parser = body_parser.raw({ type: "image/*", limit: "1mb" });

user_router.param("user", users_route_param_handlers.user_param_handler);

user_router.all("/all/:email?", middlewares.restrict_to_admin, json_parser, users_controller.get_all_users);
user_router.get("/:user", middlewares.validate_user, middlewares.restrict_to_self, json_parser, users_controller.get_user);
user_router.post("/", middlewares.validate_user, json_parser, users_controller.create_user);
user_router.post("/:user/photo", middlewares.validate_user, middlewares.restrict_to_self, raw_parser, users_controller.upload_user_photo);
user_router.patch("/:user", middlewares.validate_user, middlewares.restrict_to_self, json_parser, users_controller.update_user);
user_router.delete("/:user", middlewares.validate_user, middlewares.restrict_to_self, json_parser, users_controller.delete_user);

module.exports = user_router;
