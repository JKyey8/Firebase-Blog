let firebase; 
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


const timestamp = firebase.firestore.FieldValue.serverTimestamp;



document.getElementById("newitem").addEventListener("submit", newBlog)


//make new blog
async function newBlog(e){
e.preventDefault();

auth.onAuthStateChanged( 

async function (user) {

console.log(user.uid)
var id = user.uid
if(user){
let userID = user.uid
await db.collection("posts").add({

//@ts-ignore
title:document.getElementById("title").value,
//@ts-ignore
body:document.getElementById("postbody").value,
likes:0,
date: timestamp(),
id: id
})



} 
window.location.replace("/")

})




}



