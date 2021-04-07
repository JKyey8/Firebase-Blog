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
var admin = require("firebase-admin")
var firebaseapp = admin.initializeApp();




function isAuth(){
var user = firebase.auth().currentUser;
return user


}


//middleware
//static files
app.use(express.static((__dirname)));
//being able t get stuff from formns
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

//setting a port with heroku or local
var PORT = process.env.PORT || 5500


//adding view engine(ejs)
app.set("view engine", "ejs")
app.set("views", "pages")


 
app.get("/", function(req,res) {

res.render("index")

})

app.post("/user-signin", ((req,res) => {


db.collection("users").onSnapshot((querySnapshot) => {

querySnapshot.forEach((doc) => {
if(doc.id == req.body.uid){
console.log(req.body)

let userinfo = req.body


res.send(req.params)




} else {


}

})

})




}))

app.get("/user/:id", function (req,res){
res.render("user")




//console.log(req.params.id)

})






app.post("/newblog", ((req,res) => {

console.log(req.body)
}));






app.use((req,res) => {


res.status(404).render("404")




})





app.listen(PORT, "127.0.0.1")


console.log("listening on http://127.0.0.1:" + PORT + "/")


