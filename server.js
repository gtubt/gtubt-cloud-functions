const express = require("express");
const api_v1 = require("./app/routes");

const server = express();
server.use("/api/v1", api_v1);

const port = process.env.PORT || 3000;
server.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`gtubt server is running at port ${port}`);
  }
});
