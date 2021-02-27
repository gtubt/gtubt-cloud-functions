const express = require("express");
const user_router = require("./routes/users/user-router");

const api = express();
api.use("/user", user_router);

module.exports = api;
