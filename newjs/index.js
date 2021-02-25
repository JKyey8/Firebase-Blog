//getting data from firebase
window.addEventListener("DOMContentLoaded", () => getblogs());
const ref = db.collection("posts")
const blogcontainer = document.getElementById("blogposts")


async function getblogs(){
const data = await ref.get();
//real time data
db.collection("posts").onSnapshot((querySnapshot) => {
blogcontainer.innerHTML = "";
var posts
querySnapshot.forEach((doc) => {
posts = doc.data()
let ids = doc.id
displayBlogs(posts, ids)
    
});


})



















}


function displayBlogs(doc, ids,) {



//dispalay the blogs


var div = document.createElement("div");
var blogtitle = document.createElement("h2");
var blogtext = document.createElement("p");
var bloglikes = document.createElement("h4");
var addlike = document.createElement("button");
var deletebtn = document.createElement("button")
addlike.className = "addlikes";
deletebtn.className = "deletebtns";
deletebtn.id = "deletebtn";
addlike.id = "likebtn";   
bloglikes.className = "textlikes";
blogtitle.className = "textheader";
blogtext.className = "textzone";
div.className = "blogs";
div.id = ids
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
blogcontainer.appendChild(div)

if(blogtitle.innerHTML == "undefined"){

div.remove();



}

}




