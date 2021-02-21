const express = require("express");
const body_parser = require("body-parser");
const user_controller = require("./controllers/user-controller");

const app = express();
const json_parser = body_parser.json();

const port = process.env.PORT || 3000;

app.get("/debug", user_controller.get_all_users);
app.get("/user", json_parser, user_controller.get_user_with_email);
app.post("/user", json_parser, user_controller.create_user);
app.patch("/user", json_parser, user_controller.update_user);
app.delete("/user", json_parser, user_controller.delete_user);

app.listen(port, () => {
  console.log(`gtubt server is running at port ${port}`);
});
