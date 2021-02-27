const express = require("express");

const userRouter = require("./routes/users/user-router");

const api = express();

api.use("/user", userRouter);

module.exports = api;