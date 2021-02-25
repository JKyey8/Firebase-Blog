



async function deletebtnclick(){

const jsonfile = await fetch(url);
const data = await jsonfile.json();



var hehe;
for(let i = 0; i < data.length; i++){
document.getElementById("deletebtn" + i).addEventListener(("click"),  () => {


hehe = data[i].id

deletepost(hehe)



}

)
}
}




async function deletepost(hehe) {



await fetch(url + "/" + hehe,  {
method: "DELETE",
headers: {"Content-Type": "application/json"}

});
}



deletebtnclick();