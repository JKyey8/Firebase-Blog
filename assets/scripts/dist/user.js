auth.onAuthStateChanged(function (user) {
    if (user) {
        document.getElementById("user-email").innerHTML = user.email;
    }
    else {
    }
});
