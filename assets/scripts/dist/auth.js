var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// login and sign up boxes
document.getElementById("loginbtn").addEventListener("click", function () { document.getElementById("login-page").style.display = "block"; });
document.getElementById("close-login").addEventListener("click", function () { document.getElementById("login-page").style.display = "none"; });
document.getElementById("signupbtn").addEventListener("click", function () { document.getElementById("signup-page").style.display = "block"; });
document.getElementById("close-signup").addEventListener("click", function () { document.getElementById("signup-page").style.display = "none"; });
//sign up user
document.getElementById("signup-form").addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var SUemail, SUpassword;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                SUemail = document.getElementById('email-signup').value;
                SUpassword = document.getElementById("password-signup").value;
                return [4 /*yield*/, auth.createUserWithEmailAndPassword(SUemail, SUpassword).then(function (userCredential) { return __awaiter(_this, void 0, void 0, function () {
                        var user;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    user = userCredential.user;
                                    return [4 /*yield*/, db.collection("users").doc(user.uid).set({
                                            email: user.email,
                                            username: user.displayName
                                        })];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, db.collection("users").doc(user.uid).collection("likedposts").add({})];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            case 1:
                _a.sent();
                document.getElementById("signup-page").style.display = "none";
                return [2 /*return*/];
        }
    });
}); });
//sign in user
document.getElementById("login-form").addEventListener("submit", function (e) { return __awaiter(_this, void 0, void 0, function () {
    var LIemail, LIpassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                e.preventDefault();
                LIemail = document.getElementById('email-login').value;
                LIpassword = document.getElementById("password-login").value;
                return [4 /*yield*/, firebase.auth().signInWithEmailAndPassword(LIemail, LIpassword)
                        .then(function (userCredential) {
                        // Signed in
                        var user = userCredential.user;
                    })];
            case 1:
                _a.sent();
                document.getElementById("login-page").style.display = "none";
                return [2 /*return*/];
        }
    });
}); });
//check if user is logged in
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //@ts-ignore
        document.getElementById("user-signedout-btns").style.display = "none";
        document.getElementById("user-signedin-btns").style.display = "flex";
        document.getElementById("user-profile").addEventListener("click", function () {
            window.location.replace("/user/" + user.email);
        });
    }
    else {
        document.getElementById("user-signedout-btns").style.display = "flex";
        document.getElementById("user-signedin-btns").style.display = "none";
    }
});
//log out
var logoutbtn = document.getElementById("logoutbtn");
logoutbtn.addEventListener("click", function (e) {
    e.preventDefault();
    auth.signOut().then(function () {
        document.getElementById("user-signedout-btns").style.display = "flex";
        document.getElementById("user-signedin-btns").style.display = "none";
        window.location.replace("/");
    });
});
//log user out if the close the page
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function () {
    //@ts-ignore
    var LIemail = document.getElementById('email-login').value;
    //@ts-ignore
    var LIpassword = document.getElementById("password-login").value;
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInWithEmailAndPassword(LIemail, LIpassword);
})["catch"](function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
});
