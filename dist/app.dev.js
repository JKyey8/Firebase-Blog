"use strict";

var express = require('express');

var app = express();
app.use(express["static"](__dirname));
app.get("/", function (req, res) {
  res.sendfile(__dirname + "/index.html");
});
app.get("/user/:id", function (req, res) {
  res.sendfile(__dirname + "/pages/user.html");
});
app.listen(3000);