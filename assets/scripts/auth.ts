



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

await auth.createUserWithEmailAndPassword(SUemail, SUpassword).then(async (userCredential) => {

 var user = userCredential.user;
await db.collection("users").doc(user.uid).set({
email:user.email,
username:user.displayName,
})


await db.collection("users").doc(user.uid).collection("likedposts").add({




})


})
document.getElementById("signup-page").style.display = "none";

}) 



//loginn user

document.getElementById("login-form").addEventListener("submit", async (e) => {


e.preventDefault();


//@ts-ignore
let LIemail =  document.getElementById('email-login').value;
//@ts-ignore
let LIpassword = document.getElementById("password-login").value;
let logininfo = {LIemail, LIpassword}

await firebase.auth().signInWithEmailAndPassword(LIemail, LIpassword)
  .then( async(userCredential) => {
    // Signed in
    var user = userCredential.user;

await fetch('/user-signin', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(user),
});


await fetch('/user-signin', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(logininfo),
});

  })

document.getElementById("login-page").style.display = "none";


});

var user = firebase.auth().currentUser;

if (user) {
console.log("yes")
  // User is signed in.
} else {
  // No user is signed in.
}























//check if user is logged in
firebase.auth().onAuthStateChanged(async function (user) {
  if (user) {
/*
//@ts-ignore
fetch("/loginuser"), {
method: "POST",
Headers:{
Accept:"application/json",
"Content-Type":"application/json"
},
body:JSON.stringify({user})
}
*/
console.log("hi")
document.getElementById("user-signedout-btns").style.display = "none"

document.getElementById("user-signedin-btns").style.display = "flex"
let profileLink = document.getElementById("user-profile")

profileLink.setAttribute("href", "/user/" + user.email)
 /*document.getElementById("user-profile").addEventListener("click", function(){

window.location.replace("/user/" + user.email)



})
*/
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

window.location.replace("/")
})


}) 






//log user out if the close the page

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(() => {
//@ts-ignore
let LIemail =  document.getElementById('email-login').value;
//@ts-ignore
let LIpassword = document.getElementById("password-login").value;
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(LIemail, LIpassword);
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });
