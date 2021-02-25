document.getElementById("newitem").addEventListener("submit", submitForm)

const url = 'http://localhost:3000/posts'

async function submitForm(e){
e.preventDefault();
    var title = document.querySelector("#title").value;
    var postbody = document.querySelector("#postbody").value;
    saveMessage(title, postbody)

const jsonfile = await fetch(url);
const data = await jsonfile.json();



}

async function saveMessage(title, postbody){
var newpost = {
title: title, 
body: postbody, 
likes: 0
}

await fetch(url, {
method: "POST",
body: JSON.stringify(newpost),
headers: {"Content-Type": "application/json"}

});
window.location.replace("/index.html")



}

