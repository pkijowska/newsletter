const express = require("express");
const bodyParser = require("body-parser");
// const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function(req, res) {
  console.log("server is running on port 3000");
});

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  console.log(req.body.name,  req.body.lastname, req.body.email);
});
