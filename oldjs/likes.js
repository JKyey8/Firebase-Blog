



async function likesbtnclick(){

const jsonfile = await fetch(url);
const data = await jsonfile.json();


var newlikes;
var btnpressed;
for(let i = 0; i < data.length; i++){
document.getElementById("likebtn" + i).addEventListener(("click"),  () => {

newlikes = {
title: data[i].title,
body: data[i].body, 
likes: data[i].likes + 1 
}
btnpressed = data[i].id


console.log(btnpressed)


addlikes(newlikes, btnpressed)



}

)
}
}




async function addlikes(newlikes, btnpressed) {



await fetch(url + "/" + btnpressed,  {
method: "PUT",
body: JSON.stringify(newlikes),
headers: {"Content-Type": "application/json"}

});
}



likesbtnclick();