const express = require('express')

const app = express();



app.use(express.static((__dirname)));

app.get("/", function(req,res) {

res.sendfile(__dirname + "/index.html")
})



app.get("/user/:id", function(req,res){

res.sendfile(__dirname + "/pages/user.html")

})


app.get("/create", function(req,res){

res.sendfile(__dirname + "/pages/create.html")

})

app.listen(5500, '127.0.0.1')