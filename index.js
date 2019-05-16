// jshint esversion:6

const express = require ("express");
const bodyParser =require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  //req.body.something is used to get the valvu of the data stored iin for example crypto
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;
  var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var finalURL = baseURL + crypto + fiat;


//Making a request from server
  request(finalURL, function(error, response,body){
   var data = JSON.parse(body);
   var price = data.last;

   res.send("<h1> The current price of " + crypto + " is " + price  +  fiat  +  " </h1>");
  });
});



app.listen(5000, function(){
  console.log("Port is listerning at 5000");
});
