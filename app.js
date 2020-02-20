const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
require('dotenv').config();

const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(3000, function(req, res) {
  console.log("server is running on port 3000");
});

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  var firstname = req.body.name;
  var lastname = req.body.lastname;
  var email = req.body.email;

  var data ={
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstname,
        LNAME: lastname
      }
    }]
  }

  var jsonData = JSON.stringify(data);
  console.log(jsonData);
  var api_key = process.env.API_KEY;

  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/e1bb5cc754",
    method: "POST",
    headers: {
      "Authorization": "paula1 "+api_key
    },
    body: jsonData
  };


  request(options, function(error, response, body){
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    }else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      }else {
        console.log(response.statusCode);
        res.send("there was an error with signing up, please try again")
      }
    }
  });
});
