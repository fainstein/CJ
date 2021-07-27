const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var _ = require('lodash');

mongoose.connect('mongodb://localhost:27017/blogSiteDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/results/:category", function(req, res) {
  // console.log("category", req.params.category);
  res.render("results", {categoryName: req.params.category});
});

app.get("/log-in", function(req, res) {
  res.render("log-in");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.post("/results", function(req, res) {
  // console.log(req.body.searchQuery);
  res.redirect("/results/" + req.body.searchQuery)
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server succesfully running");
});
