const express = require("express");
const app = express();
const path = require("path");

const port = process.env.PORT;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.listen(port);
