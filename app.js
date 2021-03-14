
const express = require('express')

const app = express();


const router = express.Router();
app.use("./netlify/functions/test", router)

app.use(express.static((__dirname)));

app.get("/", function(req,res) {

res.sendfile(__dirname + "/index.html")
})



app.get("/user/:id", function(req,res){

res.sendfile(__dirname + "/pages/user.html")

})
app.listen(3000)