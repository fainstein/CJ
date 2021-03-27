const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/blogSiteDB', {
  useNewUrlParser: true
});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req,res){
  res.render("index");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server succesfully running");
});
