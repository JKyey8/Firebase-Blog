const timestamp = firebase.firestore.FieldValue.serverTimestamp;





document.getElementById("newitem").addEventListener("submit", newBlog)





async function newBlog(e){
e.preventDefault();
await db.collection("posts").add({
title:document.getElementById("title").value,
body:document.getElementById("postbody").value,
likes:0,
id: timestamp()



})

window.location.replace("/index.html")


}