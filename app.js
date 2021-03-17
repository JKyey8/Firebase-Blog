var firebase = require("firebase")
var firebaseConfig = {
    apiKey: "AIzaSyAqq_sln1epLeTCTrJoHvHtJUttZWIIAIE",
    authDomain: "blog-with-fetch-api-d1fc2.firebaseapp.com",
    projectId: "blog-with-fetch-api-d1fc2",
    storageBucket: "blog-with-fetch-api-d1fc2.appspot.com",
    messagingSenderId: "578971062320",
    appId: "1:578971062320:web:aefa7a8ecac2d7000a1df5",
    measurementId: "G-DP6MSH6JDF"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
const express = require('express')
const app = express();

//middleware
//static files
app.use(express.static((__dirname)));
//being able t get stuff from formns
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());



var user = auth.currentUser



app.get("/", function(req,res) {

res.sendfile(__dirname + "/index.html")

})



app.get("/user/:id", function(req,res, next){

res.sendfile(__dirname + "/pages/user.html")


//console.log(req.params.id)

})


app.get("/create", function(req,res){

res.sendfile(__dirname + "/pages/create.html")

})

app.post("/newblog", ((req,res) => {

//console.log(req.body)
}));


app.post("/datahi", ((req,res) => {
console.log("hi")

db.collection("users").onSnapshot((querySnapshot) => {

querySnapshot.forEach((doc) => {
if(doc.id == req.body.uid){
console.log(req.body.email)
} else {


}

})

})



//console.log(req.body)
}));



app.use((req,res) => {
res.sendFile(__dirname + "/pages/404.html")


})




app.listen(5500, '127.0.0.1')

console.log("listening on http://127.0.0.1:5500/")