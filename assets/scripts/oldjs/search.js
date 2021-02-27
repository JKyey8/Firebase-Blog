document.getElementById("searchinput").addEventListener("keyup", searchBlog)

const blogcontainer = document.getElementById("blogposts");




async function searchBlog() {

var searchinput = document.querySelector("#searchinput").value;

console.log(searchinput)


var returnedblogs = {

};


const jsonfile = await fetch(url);
const data = await jsonfile.json();


for(var i = 0; i < data.length; i++){


if(data[i].title.includes(searchinput) == false){

document.getElementById("blog" + i).style.display = "none"
}
else{

document.getElementById("blog" + i).style.display = "block"
}








}


}








