const express = require("express");
const api_v1 = require("./app/api");
const admin = require("firebase-admin");
const firebaseConfig = require("./firebase-config").firebaseConfig;

const server = express();
server.use("/api/v1", api_v1);
server.use("/images", express.static("/opt/data/photo"));
admin.initializeApp(firebaseConfig);

const port = process.env.PORT || 3000;
server.listen(port, (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`gtubt server is running at port ${port}`);
  }
});

module.exports = server;