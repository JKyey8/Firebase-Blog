//getting data from firebase

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
   getLikebtn(ids, posts)

});

})


// liking posts






async function getLikebtn(ids, posts){

document.getElementById(ids).addEventListener("click", () => {



likePost(ids, posts)


}
)



}


function likePost(ids, doc){
db.collection("posts").doc(ids).update({
likes:doc.likes + 1


})

}











function displayBlogs(doc, ids) {
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
addlike.id = ids;   
bloglikes.className = "textlikes";
blogtitle.className = "textheader";
blogtext.className = "textzone";
div.className = "blogs";

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



