const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.eName;

  var data = {
    members: [
      {email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
    ]
  };

  var jsonData = JSON.stringify(data);
  var option = {
    url: "https://us4.api.mailchimp.com/3.0/lists/e36f05d864",
    method: "POST",
    headers: {
      "Authorization": "hmx 91a099ba1dddaf1e3e5839ef4c7d5424-us4"
    },
    body: jsonData // comment it out to run
  }
  request(option, function(error, response, body){
    if(error){
      res.sendFile(__dirname + "/failure.html");
    } else{
      if (response.statusCode == 200){
        res.sendFile(__dirname + "/success.html");
      }
      else{
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});
app.post("/failure",function(req,res){
  res.redirect("/");
});
app.listen(process.env.PORT || 3000,function(){ // To make it work both on heroku and our local server
  console.log("Server is running on port: 3000");
});

//91a099ba1dddaf1e3e5839ef4c7d5424-us4
//List ID: e36f05d864
// New comment
