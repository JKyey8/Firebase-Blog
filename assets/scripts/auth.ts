let firebase;



// login and sign up boxes
document.getElementById("loginbtn").addEventListener("click", () => {document.getElementById("login-page").style.display = "block";} )

document.getElementById("close-login").addEventListener("click", () => {document.getElementById("login-page").style.display = "none";} )


document.getElementById("signupbtn").addEventListener("click", () => {document.getElementById("signup-page").style.display = "block";} )

document.getElementById("close-signup").addEventListener("click", () => {document.getElementById("signup-page").style.display = "none";} )


//sign up user
document.getElementById("signup-form").addEventListener("submit", async (e) => {

e.preventDefault();
//@ts-ignore
let SUemail =  document.getElementById('email-signup').value;
//@ts-ignore
let SUpassword = document.getElementById("password-signup").value;

await auth.createUserWithEmailAndPassword(SUemail, SUpassword).then((userCredential) => {

 var user = userCredential.user;



})
document.getElementById("signup-page").style.display = "none";

}) 



//sign in user
document.getElementById("login-form").addEventListener("submit", async (e) => {

e.preventDefault();
//@ts-ignore
let LIemail =  document.getElementById('email-login').value;
//@ts-ignore
let LIpassword = document.getElementById("password-login").value;

await firebase.auth().signInWithEmailAndPassword(LIemail, LIpassword)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;





  })
document.getElementById("login-page").style.display = "none";
});




//check if user is logged in
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
//@ts-ignore



document.getElementById("user-signedout-btns").style.display = "none"

document.getElementById("user-signedin-btns").style.display = "flex"


  } else {
  document.getElementById("user-signedout-btns").style.display = "flex"

document.getElementById("user-signedin-btns").style.display = "none"
  }

} )



//log out
let logoutbtn = document.getElementById("logoutbtn")
logoutbtn.addEventListener("click", (e) => {
e.preventDefault();
auth.signOut().then(() => {
  document.getElementById("user-signedout-btns").style.display = "flex"

document.getElementById("user-signedin-btns").style.display = "none"

})


}) 


export let hi = function getuserId(user){
console.log(user.uid);
}






