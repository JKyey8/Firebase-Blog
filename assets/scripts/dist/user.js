auth.onAuthStateChanged(function (user) {
    if (user) {
        document.getElementById("user-email").innerHTML = user.email;
        document.getElementById("user-profile").addEventListener("click", function () {
            window.location.replace("/user/" + user.email);
        });
    }
    else {
        document.getElementById("user-email").innerHTML = "no user";
    }
});
