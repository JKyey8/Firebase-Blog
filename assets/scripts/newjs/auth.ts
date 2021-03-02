let firebase;
const auth = firebase.auth();


// login and sign up boxes
document.getElementById("loginbtn").addEventListener("click", () => {document.getElementById("login-page").style.display = "block";} )

document.getElementById("close-login").addEventListener("click", () => {document.getElementById("login-page").style.display = "none";} )


document.getElementById("signupbtn").addEventListener("click", () => {document.getElementById("signup-page").style.display = "block";} )

document.getElementById("close-signup").addEventListener("click", () => {document.getElementById("signup-page").style.display = "none";} )








document.getElementById("signup-form").addEventListener("submit", async (e) => {

e.preventDefault();
//@ts-ignore
let SUemail =  document.getElementById('email-signup').value;
//@ts-ignore
let SUpassword = document.getElementById("password-signup").value;

await auth.createUserWithEmailAndPassword(SUemail, SUpassword).then((userCredential) => {

var user = userCredential.user

})
document.getElementById("signup-page").style.display = "none";






}) 









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

    // ...
console.log(user)
  })
document.getElementById("login-page").style.display = "none";
})




firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
console.log(user)
document.getElementById("user-btns").style.display = "none"

document.getElementById("user-signedin-btns").style.display = "flex"


   

  } else {
  document.getElementById("user-btns").style.display = "flex"

document.getElementById("user-signedin-btns").style.display = "none"
  }

} )

