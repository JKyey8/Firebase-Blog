
const blogcontainer = document.getElementById("blogposts")


//real time data for posts
db.collection("posts")
.orderBy("id", "desc")
.onSnapshot((querySnapshot) => {
blogcontainer.innerHTML = "";
var posts

querySnapshot.forEach((doc) => {
posts = doc.data()
let ids = doc.id

displayBlogs(posts, ids)
likePost(ids, posts)
deletePost(ids, posts)
searchBlog(posts, ids)









});

});












// liking posts
let isLiked = false;
function likePost(ids, posts){

document.getElementById("likebtn-" + ids).addEventListener("click", async () => {
console.log(posts.id)
console.log(ids)

let hi1 = [];


//check if user is logged in
firebase.auth().onAuthStateChanged(function (userCredentials) {
  if (userCredentials) {
//@ts-ignore

let user = userCredentials








db.collection("users").doc(user.uid).collection("likedposts").get().then((snapshot) => {

snapshot.forEach((doc) => {

let likedpostsId = doc.id
hi1.push(likedpostsId)

});





hi({hi1, ids, posts, user})
})

  } 

} )


/*
db.collection("users").doc(posts.id).collection("likedposts").onSnapshot(  (snapshot) =>{

 snapshot.forEach((doc) => {

let likedpostsId = doc.id
hi1.push(likedpostsId)


 })
hi(hi1, ids, posts)

 })
*/


})
}


async function hi(parameters) {
console.log(parameters.hi1)
let no = parameters.hi1.toString()
console.log(no)
console.log(parameters.ids)

console.log(parameters.user.uid)


if(no.includes(parameters.ids) == false){
db.collection("users").doc(parameters.user.uid).collection("likedposts").doc(parameters.ids).set({});

db.collection("posts").doc(parameters.ids).update({
likes:parameters.posts.likes + 1
});


console.log("not liked")
} else if(no.includes(parameters.ids) == true) {

db.collection("users").doc(parameters.user.uid).collection("likedposts").doc(parameters.ids).delete();


db.collection("posts").doc(parameters.ids).update({
likes:parameters.posts.likes - 1
});


console.log("liked")

}






}








//dispalay the blogs
function displayBlogs(doc, ids) {
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
bloglikes.className = "textlikes";
blogtitle.className = "textheader";
blogtext.className = "textzone";
div.className = "blogs";
div.id = "blog-" + ids
addlike.innerHTML = "Like";
blogtext.innerHTML = doc.body;
bloglikes.innerHTML = doc.likes + " likes"
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

//delete posts
async function deletePost(ids, doc){
document.getElementById("deletebtn-" + ids).addEventListener("click", () => {




auth.onAuthStateChanged((user) => {
if(user.uid == doc.id){
db.collection("posts").doc(ids).delete()
}


})
})
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

