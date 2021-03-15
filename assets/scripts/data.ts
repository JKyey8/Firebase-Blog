
const blogcontainer = document.getElementById("blogposts")
document.addEventListener('DOMContentLoaded', async function(){
await getData();

 realtimeData();


})




//real time data for posts
async function realtimeData(){

await getData()

db.collection("posts")
.orderBy("id", "desc")
.onSnapshot((querySnapshot) => {
let posts
let ids;
let currentlikes;
querySnapshot.forEach((doc) => {
posts = doc.data()
ids = doc.id
currentlikes = posts.likes

PostFunctions(posts, ids, currentlikes)
});

document.getElementById("preloader").style.display = "none"

});
}


//getting data(need refesh for new data)

async function getData(){

db.collection("posts")
.orderBy("date", "desc")
.get()
.then((snapshot) => {
document.getElementById("preloader").style.display = "block"
blogcontainer.innerHTML = "";
let posts
let ids;
let currentlikes
snapshot.forEach((doc) => {
posts = doc.data()
 ids = doc.id;

currentlikes = posts.likes
searchBlog(posts, ids)
displayBlogs(posts, ids, currentlikes)
changeLikes(posts, ids, currentlikes)

})
document.getElementById("preloader").style.display = "none"
})

}

function changeLikes(posts, ids, currentlikes){
// liking posts

document.getElementById("likebtn-" + ids).addEventListener("click", async () => {


let user;
let userlikedposts = [];




//check if user is logged in
auth.onAuthStateChanged((userCredentials) => {
  if (userCredentials) {

user = userCredentials
db.collection("users").doc(user.uid).collection("likedposts").get().then((snapshot) => {

snapshot.forEach((doc) => {
let likedpostsId = doc.id
userlikedposts.push(likedpostsId)

});

let likedpostsId = userlikedposts.toString()

//liking posts
if(likedpostsId.includes(ids) == false){


currentlikes = currentlikes + 1
document.getElementById("likes-" + ids).innerHTML = currentlikes + " likes"


document.getElementById("blog-" + ids).style.borderColor = "red"

} else if(likedpostsId.includes(ids) == true) {



currentlikes = currentlikes - 1
document.getElementById("likes-" + ids).innerHTML = currentlikes + " likes"
document.getElementById("blog-" + ids).style.borderColor = "purple"
} 


})

  } else {


console.log("not signed in")
}

} )




})



}




function PostFunctions(posts, ids, currentlikes){
// liking posts

document.getElementById("likebtn-" + ids).addEventListener("click", async () => {


let user;
let userlikedposts = [];




//check if user is logged in
auth.onAuthStateChanged((userCredentials) => {
  if (userCredentials) {

user = userCredentials
db.collection("users").doc(user.uid).collection("likedposts").get().then((snapshot) => {

snapshot.forEach((doc) => {
let likedpostsId = doc.id
userlikedposts.push(likedpostsId)

});

let likedpostsId = userlikedposts.toString()

//liking posts
if(likedpostsId.includes(ids) == false){
db.collection("users").doc(user.uid).collection("likedposts").doc(ids).set({});

db.collection("posts").doc(ids).update({
likes:currentlikes + 1
});




document.getElementById("blog-" + ids).style.borderColor = "red"

} else if(likedpostsId.includes(ids) == true) {

db.collection("users").doc(user.uid).collection("likedposts").doc(ids).delete();

db.collection("posts").doc(ids).update({
likes:currentlikes - 1
});


document.getElementById("blog-" + ids).style.borderColor = "purple"
} 


})

  } else{

console.log("not signed in")
}

} )




})

//deleting a post
document.getElementById("deletebtn-" + ids).addEventListener("click", () => {
auth.onAuthStateChanged((user) => {
if(user.uid == posts.id){
db.collection("posts").doc(ids).delete()
}
document.getElementById("blog-" + ids).remove();

})
})



}

//dispalay the blogs
function displayBlogs(doc, ids, currentlikes) {
var div = document.createElement("div");
var blogtitle = document.createElement("h2");
var blogtext = document.createElement("p");
var bloglikes = document.createElement("h4");
var addlike = document.createElement("button");
var deletebtn = document.createElement("button")
var comment = document.createElement("textarea")
comment.className = "sendcomment";
comment.id = "comments-" + ids;
addlike.className = "likepost";
deletebtn.className = "deletepost";
deletebtn.id = "deletebtn-" + ids;
addlike.id = "likebtn-" + ids;   
bloglikes.id = "likes-" + ids
bloglikes.className = "textlikes";
blogtitle.className = "textheader";
blogtext.className = "textzone";
div.className = "blogs";
div.id = "blog-" + ids
addlike.innerHTML = "Like";
blogtext.innerHTML = doc.body;
bloglikes.innerHTML = currentlikes + " likes"
blogtitle.innerHTML = doc.title;
deletebtn.innerHTML = "delete post"
div.appendChild(blogtitle)
div.appendChild(bloglikes)
div.appendChild(deletebtn)
div.appendChild(addlike)
div.appendChild(blogtext)
div.appendChild(comment)
blogcontainer.appendChild(div)

if(doc.likes <= 0){
doc.likes = 0

}

if(blogtitle.innerHTML == "undefined"){

div.remove();

}

}


//search posts
async function searchBlog(doc, ids){

document.getElementById("searchinput").addEventListener("keyup", () => {
//@ts-ignore
var searchinput = document.querySelector("#searchinput").value;


if(doc.title.includes(searchinput) == false  ){
document.getElementById("blog-" + ids).style.display = "none";

}
 else (
document.getElementById("blog-" + ids).style.display = "block"

)

})
}

