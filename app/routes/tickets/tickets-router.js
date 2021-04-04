const express = require("express");
const body_parser = require("body-parser");
const tickets_route_param_handlers = require("./tickets-route-param-handler");
const tickets_controller = require("../../controllers/tickets-controller");
const middlewares = require("../../middlewares");

const ticket_router = express.Router();
const json_parser = body_parser.json();

ticket_router.param("ticket", tickets_route_param_handlers.ticket_param_handler);

ticket_router.all("/all/:id?", middlewares.restrict_to_self, json_parser, tickets_controller.get_all_tickets);
// TODO: Currently restricting to admin, will make it so the user can only request their tickets.
ticket_router.get("/:ticket", middlewares.restrict_to_admin, json_parser, tickets_controller.get_ticket);
ticket_router.post("/", middlewares.restrict_to_self, json_parser, tickets_controller.create_ticket);
ticket_router.patch("/:ticket", middlewares.restrict_to_admin, json_parser, tickets_controller.update_ticket);
ticket_router.delete("/:ticket", middlewares.restrict_to_admin, json_parser, tickets_controller.delete_ticket);

module.exports = ticket_router;
