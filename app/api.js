const express = require("express");
const users_router = require("./routes/users/users-router");
const events_router = require("./routes/events/events-router");

const api = express();

api.use("/users", users_router);
api.use("/events", events_router);

module.exports = api;
