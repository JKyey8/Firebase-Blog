//getting data from firebase
let firebase;

const db = firebase.firestore();
const ref = db.collection("posts")
const blogcontainer = document.getElementById("blogposts")


//real time data
db.collection("posts").onSnapshot((querySnapshot) => {
blogcontainer.innerHTML = "";
var posts

querySnapshot.forEach((doc) => {
posts = doc.data()
let ids = doc.id

displayBlogs(posts, ids)
likePost(ids, posts)
deletePost(ids, posts)
searchBlog(posts, ids)
console.log(ids)
});

});


// liking posts
let isLiked = false
function likePost(ids, doc){

document.getElementById("likebtn" + ids).addEventListener("click", () => {

if(!isLiked){
db.collection("posts").doc(ids).update({
likes:doc.likes + 1
})
isLiked = true
document.getElementById("likebtn" + ids).classList.add("likebtnliked")

} else {
db.collection("posts").doc(ids).update({
likes:doc.likes - 1
})
isLiked = false




}



}
)
}



//dispalay the blogs
function displayBlogs(doc, ids) {
var div = document.createElement("div");
var blogtitle = document.createElement("h2");
var blogtext = document.createElement("p");
var bloglikes = document.createElement("h4");
var addlike = document.createElement("button");
var deletebtn = document.createElement("button")
addlike.className = "addlikes";
deletebtn.className = "deletebtns";
deletebtn.id = "deletebtn" + ids;
addlike.id = "likebtn" + ids;   
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
blogcontainer.appendChild(div)

if(blogtitle.innerHTML == "undefined"){

div.remove();

}

}


//delete posts

async function deletePost(ids, doc){
document.getElementById("deletebtn" + ids).addEventListener("click", () => {
db.collection("posts").doc(ids).delete()
}
)
}



//search posts
async function searchBlog(doc, ids){
document.getElementById("searchinput").addEventListener("keyup", () => {
//@ts-ignore
var searchinput = document.querySelector("#searchinput").value;


if(doc.title.includes(searchinput) == false  ){
document.getElementById("blog-" + ids).style.display = "none";
} else (
document.getElementById("blog-" + ids).style.display = "block"

)

})
}






