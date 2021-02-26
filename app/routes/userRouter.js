const express = require("express");
const body_parser = require("body-parser");
const getAllUsers = require("../controllers/users/users-controller").get_all_users;
const getUser = require("../controllers/users/users-controller").get_user_with_email;
const createUser = require("../controllers/users/users-controller").create_user;
const updateUser = require("../controllers/users/users-controller").update_user;
const deleteUser = require("../controllers/users/users-controller").delete_user;


const userRouter = express.Router();
const json_parser = body_parser.json();

userRouter.all("/all", json_parser, getAllUsers);
userRouter.get("/:email", json_parser, getUser);
userRouter.post("/", json_parser, createUser);
userRouter.patch("/:email", json_parser, updateUser);
userRouter.delete("/:email", json_parser, deleteUser);

module.exports = userRouter;