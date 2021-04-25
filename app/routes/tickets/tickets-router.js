const express = require("express");
const body_parser = require("body-parser");
const tickets_route_param_handlers = require("./tickets-route-param-handler");
const event_route_param_handlers = require("../events/events-route-param-handler");
const users_route_param_handlers = require("../users/users-route-param-handlers");
const tickets_controller = require("../../controllers/tickets-controller");
const middlewares = require("../../middlewares");

const ticket_router = express.Router();
const json_parser = body_parser.json();

// Ticket ID route parameter handler.
ticket_router.param("ticket", tickets_route_param_handlers.ticket_param_handler);
ticket_router.param("event", event_route_param_handlers.event_param_handler);
ticket_router.param("user", users_route_param_handlers.user_param_handler);

// Get all tickets of user (self).
ticket_router.all("/all/:user/:id?", middlewares.validate_user, middlewares.restrict_to_self, json_parser, tickets_controller.get_all_tickets);

// Get one ticket of user (self).
ticket_router.get("/:user/:ticket", middlewares.validate_user, middlewares.restrict_to_self, json_parser, tickets_controller.get_ticket);

// Create ticket for user at event.
ticket_router.post("/:user/:event", middlewares.validate_user, middlewares.restrict_to_self, json_parser, tickets_controller.create_ticket);

// Update ticket with ID.
ticket_router.patch("/:ticket", middlewares.restrict_to_admin, json_parser, tickets_controller.update_ticket);

// Delete ticket with ID.
ticket_router.delete("/:ticket", middlewares.restrict_to_admin, json_parser, tickets_controller.delete_ticket);

module.exports = ticket_router;
