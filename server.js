const express = require("express");
const api_v1 = require("./app/api");

const server = express();
server.use("/api/v1", api_v1);
server.use("/images", express.static("/opt/data/photo"));

const port = process.env.PORT || 3000;
server.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`gtubt server is running at port ${port}`);
  }
});
