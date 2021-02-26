const express = require("express");

const userRouter = require("./routes/userRouter");

const api = express();

api.use("/user", userRouter);

module.exports = api;