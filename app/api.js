const express = require("express");
const users_router = require("./routes/users/users-router");
const events_router = require("./routes/events/events-router");
const news_router = require("./routes/news/news-router");
const tickets_router = require("./routes/tickets/tickets-router");

const api = express();

api.use("/users", users_router);
api.use("/events", events_router);
api.use("/news", news_router);
api.use("/tickets", tickets_router);

api.get("/helloworld", (req, res, next) => {
  res.status(200).send("Hello, World!");
});

module.exports = api;
