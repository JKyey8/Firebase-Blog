//getting data from firebase


async function getblogs(){

const ref = db.collection("posts")
const data = await ref.get();


data.docs.forEach(doc => {
const blogpost = doc.data();
   
displayBlogs(blogpost, data)
});





}


window.addEventListener("DOMContentLoaded", () => getblogs())


function displayBlogs(blogpost, data){

let i;
for(i = 0; i<data.docs.length;i++)

var div = document.createElement("div");
var blogtitle = document.createElement("h2");
var blogtext = document.createElement("p");
var bloglikes = document.createElement("h4");
var addlike = document.createElement("button");
var deletebtn = document.createElement("button")
addlike.className = "addlikes";
deletebtn.className = "deletebtns";
deletebtn.id = "deletebtn" + i;
addlike.id = "likebtn" + i ;
bloglikes.className = "textlikes";
blogtitle.className = "textheader";
blogtext.className = "textzone";
div.className = "blogs";
div.id = "blog" + i
addlike.innerHTML = "Like";
blogtext.innerHTML = blogpost.body;
bloglikes.innerHTML = blogpost.likes + " likes"
blogtitle.innerHTML = blogpost.title;
deletebtn.innerHTML = "delete post"
div.appendChild(blogtitle)
div.appendChild(bloglikes)
div.appendChild(deletebtn)
div.appendChild(addlike)
div.appendChild(blogtext)
blogposts.appendChild(div)








}