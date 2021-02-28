"use strict";

var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://Admin1:<dinoturtle.>@test1.m0wuz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect(function (err) {
  var collection = client.db("josndata").collection("test1"); // perform actions on the collection object

  console.log(collection);
  client.close();
});