const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// MONGOOSE CONNECT AND MONGOOSE SCHEMAS

mongoose.connect('mongodb://localhost:27017/CJDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const usuarioSchema = mongoose.Schema ({
  _id: Number,
  nombre: String,
  apellido: String,
  email: String,
  // password: String,
  fecha_reg: Date
});

const recetaSchema = mongoose.Schema ({
  _id: Number,
  titulo: String,
  descripcion: String,
  ingredientes: {
    nombre: String,
    cantidad: Number,
    medida: String
  },
  instrucciones: [String],
  id_usuario: Number,
  clasificacion: {
    categoria: String,
    carne: Boolean,
    lacteo: Boolean,
    parve: Boolean,
    vegetariano: Boolean,
    vegano: Boolean,
    celiaco: Boolean,
    pesaj: Boolean
  },
  fecha: Date
});

const comentarioSchema = mongoose.Schema ({
  _id: Number,
  fecha: Date,
  id_usuario: Number,
  contenido: String,
  calificacion: Number,
  id_receta: Number
});

// GET METHODS

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/results/:category", function(req, res) {
  console.log("category:", req.params.category);
  res.render("results",{categoryName: _.capitalize(req.params.category)});
});

app.get("/log-in", function(req, res) {
  res.render("log-in");
});

app.get("/register", function(req, res) {
  res.render("register");
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.get("/new-recipe", function(req, res) {
  res.render("new-recipe");
});

// POST METHODS

app.post("/results", function(req, res) {
  // console.log(req.body.searchQuery);
  res.redirect("/results/" + req.body.searchQuery)
})

// app.post("/about", function(req, res) {
//
// })

app.listen(process.env.PORT || 3000, function() {
  console.log("Server succesfully running");
});
