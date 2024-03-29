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
var firebase;
var firebaseConfig = {
    apiKey: "AIzaSyAqq_sln1epLeTCTrJoHvHtJUttZWIIAIE",
    authDomain: "blog-with-fetch-api-d1fc2.firebaseapp.com",
    projectId: "blog-with-fetch-api-d1fc2",
    storageBucket: "blog-with-fetch-api-d1fc2.appspot.com",
    messagingSenderId: "578971062320",
    appId: "1:578971062320:web:aefa7a8ecac2d7000a1df5",
    measurementId: "G-DP6MSH6JDF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var auth = firebase.auth();
var timestamp = firebase.firestore.FieldValue.serverTimestamp;
document.getElementById("newitem").addEventListener("submit", newBlog);
//make new blog
function newBlog(e) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            e.preventDefault();
            auth.onAuthStateChanged(function (user) {
                return __awaiter(this, void 0, void 0, function () {
                    var userID;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!user) return [3 /*break*/, 2];
                                userID = user.uid;
                                return [4 /*yield*/, db.collection("posts").add({
                                        //@ts-ignore
                                        title: document.getElementById("title").value,
                                        //@ts-ignore
                                        body: document.getElementById("postbody").value,
                                        likes: 0,
                                        date: timestamp(),
                                        id: userID
                                    })];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2:
                                window.location.replace("/");
                                return [2 /*return*/];
                        }
                    });
                });
            });
            return [2 /*return*/];
        });
    });
}
