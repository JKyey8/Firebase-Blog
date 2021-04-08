"use strict";

var firebase = require("firebase");

var firebaseConfig = {
  apiKey: "AIzaSyAqq_sln1epLeTCTrJoHvHtJUttZWIIAIE",
  authDomain: "blog-with-fetch-api-d1fc2.firebaseapp.com",
  projectId: "blog-with-fetch-api-d1fc2",
  storageBucket: "blog-with-fetch-api-d1fc2.appspot.com",
  messagingSenderId: "578971062320",
  appId: "1:578971062320:web:aefa7a8ecac2d7000a1df5",
  measurementId: "G-DP6MSH6JDF"
}; // Initialize Firebase

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var auth = firebase.auth();

var express = require('express');

var app = express();

var admin = require("firebase-admin");

var firebaseapp = admin.initializeApp(); //middleware
//static files

app.use(express["static"](__dirname)); //being able t get stuff from formns

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json()); //setting a port with heroku or local

var PORT = process.env.PORT || 5500; //adding view engine(ejs)

app.set("view engine", "ejs");
app.set("views", "pages");
app.get("/", function (req, res) {
  res.render("index", {
    foo: "no"
  });
});
/*
app.get('/', function(req, res){
currentPrice = 0
grandTotal = 0

    res.render('test' , {
        currentPrice,
        grandTotal,
foo:"old"
    });
});

app.post('/set-price', function(req, res){
    let price = req.body.price;
    currentPrice = price;
grandTotal = 0
    res.render('test' , {
        currentPrice,
        grandTotal,
foo:"new"
    });
});
*/

app.post("/user-signin", function _callee(req, res) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body);
          res.render("index", {
            foo: "hi"
          });

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.get("/user/:id", function (req, res) {
  res.render("user", {
    email: req.params.id
  });
  console.log(req.params);
});
app.get("/create", function (req, res) {
  res.render("create");
  console.log(req.params);
});
app.post("/newblog", function (req, res) {
  console.log(req.body);
});
app.use(function (req, res) {
  res.status(404).render("404");
});
app.listen(PORT, "127.0.0.1");
console.log("listening on http://127.0.0.1:" + PORT + "/");