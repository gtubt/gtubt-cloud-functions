const express = require("express");
const api = require("./app/routes");

const server = express();

const port = process.env.PORT || 3000;

server.use("/api/v1", api);

server.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`gtubt server is running at port ${port}`);
});