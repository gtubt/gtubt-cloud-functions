const express = require("express");
const body_parser = require("body-parser");

const { andRestrictToSelf, isAdmin } = require("../../middlewares/index");

const { user_param } = require("./users-params");

const getAllUsers = require("../../controllers/users/users-controller").get_all_users;
const getUser = require("../../controllers/users/users-controller").get_user_with_email;
const createUser = require("../../controllers/users/users-controller").create_user;
const updateUser = require("../../controllers/users/users-controller").update_user;
const deleteUser = require("../../controllers/users/users-controller").delete_user;


const userRouter = express.Router();
const json_parser = body_parser.json();

userRouter.param("user", user_param);

userRouter.all("/all/:email?", isAdmin, json_parser, getAllUsers);
userRouter.get("/:user", andRestrictToSelf, json_parser, getUser);
userRouter.post("/", andRestrictToSelf, json_parser, createUser);
userRouter.patch("/:user", andRestrictToSelf, json_parser, updateUser);
userRouter.delete("/:user", andRestrictToSelf, json_parser, deleteUser);

module.exports = userRouter;