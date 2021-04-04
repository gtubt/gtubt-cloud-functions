const express = require("express");
const body_parser = require("body-parser");
const events_route_param_handlers = require("./events-route-param-handler");
const events_controller = require("../../controllers/events-controller");
const middlewares = require("../../middlewares");

const event_router = express.Router();
const json_parser = body_parser.json();

event_router.param("event", events_route_param_handlers.event_param_handler);

event_router.all("/all/:id?", middlewares.restrict_to_self, json_parser, events_controller.get_all_events);
event_router.get("/:event", middlewares.restrict_to_self, json_parser, events_controller.get_event);
event_router.post("/", middlewares.restrict_to_admin, json_parser, events_controller.create_event);
event_router.patch("/:event", middlewares.restrict_to_admin, json_parser, events_controller.update_event);
event_router.delete("/:event", middlewares.restrict_to_admin, json_parser, events_controller.delete_event);

module.exports = event_router;
