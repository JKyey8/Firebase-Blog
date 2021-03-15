auth.onAuthStateChanged((user) =>{
if(user){

document.getElementById("user-email").innerHTML = user.email





} else{
}


})