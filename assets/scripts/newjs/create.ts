//same tmestamp as firestore server
const timestamp = firebase.firestore.FieldValue.serverTimestamp;


document.getElementById("newitem").addEventListener("submit", newBlog)



async function newBlog(e){
e.preventDefault();
//function to add new data to teh database
await db.collection("posts").add({
//@ts-ignore
title:document.getElementById("title").value,
//@ts-ignore
body:document.getElementById("postbody").value,
likes:0,
id: timestamp()



})

window.location.replace("/index.html")


}