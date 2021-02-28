let firebase;
export const db = firebase.firestore();


const auth = firebase.auth();

const blogcontainer = document.getElementById("blogposts")


//real time data
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
function likePost(ids, doc){

document.getElementById("likebtn-" + ids).addEventListener("click", () => {

if(!isLiked){
document.getElementById("likebtn-" + ids).style.display = "none"
db.collection("posts").doc(ids).update({
likes:doc.likes + 1
});
isLiked = true;


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

if(blogtitle.innerHTML == "undefined"){

div.remove();

}

}

//delete posts
async function deletePost(ids, doc){
document.getElementById("deletebtn-" + ids).addEventListener("click", () => {
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

}
 else (
document.getElementById("blog-" + ids).style.display = "block"

)

})
}

// login and sign up boxes
document.getElementById("loginbtn").addEventListener("click", () => {document.getElementById("login-page").style.display = "block";} )

document.getElementById("close-login").addEventListener("click", () => {document.getElementById("login-page").style.display = "none";} )


document.getElementById("signupbtn").addEventListener("click", () => {document.getElementById("signup-page").style.display = "block";} )

document.getElementById("close-signup").addEventListener("click", () => {document.getElementById("signup-page").style.display = "none";} )

document.getElementById("signup-form").addEventListener("submit", newUser )

document.getElementById("login-form").addEventListener("submit", loginUser )






async function newUser(e){
e.preventDefault();
//@ts-ignore
let SUemail =  document.getElementById('email-signup').value;
//@ts-ignore
let SUpassword = document.getElementById("password-signup").value;

auth.createUserWithEmailAndPassword(SUemail, SUpassword).then((userCredential) => {

var user = userCredential.user

})
}

async function loginUser(e){
e.preventDefault();
//@ts-ignore
let LIemail =  document.getElementById('email-login').value;
//@ts-ignore
let LIpassword = document.getElementById("password-login").value;

firebase.auth().signInWithEmailAndPassword(LIemail, LIpassword)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    // ...
  })

}
