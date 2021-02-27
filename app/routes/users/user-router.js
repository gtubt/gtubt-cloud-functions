const express = require("express");
const body_parser = require("body-parser");
const user_route_param_handler = require("./user-route-param-handler");
const users_controller = require("../../controllers/users-controller");
const middlewares = require("../../middlewares");

const user_router = express.Router();
const json_parser = body_parser.json();

user_router.param("user", user_route_param_handler);

user_router.all("/all/:email?", middlewares.restrict_to_admin, json_parser, users_controller.get_all_users);
user_router.get("/:user", middlewares.restrict_to_self, json_parser, users_controller.get_user);
user_router.post("/", middlewares.restrict_to_self, json_parser, users_controller.create_user);
user_router.patch("/:user", middlewares.restrict_to_self, json_parser, users_controller.update_user);
user_router.delete("/:user", middlewares.restrict_to_self, json_parser, users_controller.delete_user);

module.exports = user_router;
