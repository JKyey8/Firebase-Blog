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
var blogcontainer = document.getElementById("blogposts");
//real time data for posts
db.collection("posts")
    .orderBy("id", "desc")
    .onSnapshot(function (querySnapshot) {
    blogcontainer.innerHTML = "";
    var posts;
    querySnapshot.forEach(function (doc) {
        posts = doc.data();
        var ids = doc.id;
        displayBlogs(posts, ids);
        likePost(ids, posts);
        deletePost(ids, posts);
        searchBlog(posts, ids);
    });
});
// liking posts
var isLiked = false;
function likePost(ids, posts) {
    var _this = this;
    document.getElementById("likebtn-" + ids).addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
        var hi1;
        return __generator(this, function (_a) {
            console.log(posts.id);
            console.log(ids);
            hi1 = [];
            //check if user is logged in
            firebase.auth().onAuthStateChanged(function (userCredentials) {
                if (userCredentials) {
                    //@ts-ignore
                    var user_1 = userCredentials;
                    db.collection("users").doc(user_1.uid).collection("likedposts").get().then(function (snapshot) {
                        snapshot.forEach(function (doc) {
                            var likedpostsId = doc.id;
                            hi1.push(likedpostsId);
                        });
                        hi({ hi1: hi1, ids: ids, posts: posts, user: user_1 });
                    });
                }
            });
            return [2 /*return*/];
        });
    }); });
}
function hi(parameters) {
    return __awaiter(this, void 0, void 0, function () {
        var no;
        return __generator(this, function (_a) {
            console.log(parameters.hi1);
            no = parameters.hi1.toString();
            console.log(no);
            console.log(parameters.ids);
            console.log(parameters.user.uid);
            if (no.includes(parameters.ids) == false) {
                db.collection("users").doc(parameters.user.uid).collection("likedposts").doc(parameters.ids).set({});
                db.collection("posts").doc(parameters.ids).update({
                    likes: parameters.posts.likes + 1
                });
                console.log("not liked");
            }
            else if (no.includes(parameters.ids) == true) {
                db.collection("users").doc(parameters.user.uid).collection("likedposts").doc(parameters.ids)["delete"]();
                db.collection("posts").doc(parameters.ids).update({
                    likes: parameters.posts.likes - 1
                });
                console.log("liked");
            }
            return [2 /*return*/];
        });
    });
}
//dispalay the blogs
function displayBlogs(doc, ids) {
    var div = document.createElement("div");
    var blogtitle = document.createElement("h2");
    var blogtext = document.createElement("p");
    var bloglikes = document.createElement("h4");
    var addlike = document.createElement("button");
    var deletebtn = document.createElement("button");
    var comment = document.createElement("textarea");
    comment.className = "sendcomment";
    comment.id = "comments-" + ids;
    addlike.className = "likepost";
    deletebtn.className = "deletepost";
    deletebtn.id = "deletebtn-" + ids;
    addlike.id = "likebtn-" + ids;
    bloglikes.className = "textlikes";
    blogtitle.className = "textheader";
    blogtext.className = "textzone";
    div.className = "blogs";
    div.id = "blog-" + ids;
    addlike.innerHTML = "Like";
    blogtext.innerHTML = doc.body;
    bloglikes.innerHTML = doc.likes + " likes";
    blogtitle.innerHTML = doc.title;
    deletebtn.innerHTML = "delete post";
    div.appendChild(blogtitle);
    div.appendChild(bloglikes);
    div.appendChild(deletebtn);
    div.appendChild(addlike);
    div.appendChild(blogtext);
    div.appendChild(comment);
    blogcontainer.appendChild(div);
    if (doc.likes <= 0) {
        doc.likes = 0;
    }
    if (blogtitle.innerHTML == "undefined") {
        div.remove();
    }
}
//delete posts
function deletePost(ids, doc) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            document.getElementById("deletebtn-" + ids).addEventListener("click", function () {
                auth.onAuthStateChanged(function (user) {
                    if (user.uid == doc.id) {
                        db.collection("posts").doc(ids)["delete"]();
                    }
                });
            });
            return [2 /*return*/];
        });
    });
}
//search posts
function searchBlog(doc, ids) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            document.getElementById("searchinput").addEventListener("keyup", function () {
                //@ts-ignore
                var searchinput = document.querySelector("#searchinput").value;
                if (doc.title.includes(searchinput) == false) {
                    document.getElementById("blog-" + ids).style.display = "none";
                }
                else
                    (document.getElementById("blog-" + ids).style.display = "block");
            });
            return [2 /*return*/];
        });
    });
}
