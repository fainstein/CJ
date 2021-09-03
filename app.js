const express = require("express");
// const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var _ = require('lodash');

const app = express();

app.set('view engine', 'ejs');
// app.use(express.json());

//BODYPARSER DEPRECATED
// app.use(bodyParser.urlencoded({
//   extended: true
// }));

app.use(express.urlencoded({
  extended: true
}));


app.use(express.static("public"));

// MONGOOSE MONGODB CONNECT

mongoose.connect('mongodb://localhost:27017/CJDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var categoriesArray = ["Entrada", "platoFuerte", "Sefaradi", "Dulce", "Shabat", "Ashkenazi"];

//MONGOOSE SCHEMAS

// const usuarioSchema = mongoose.Schema ({
//   _id: Number,
//   nombre: String,
//   apellido: String,
//   email: String,
//   // password: String,
//   fecha_reg: Date
// });

const recipeSchema = mongoose.Schema({
  titulo: String,
  cantidad_porciones: Number,
  descripcion: String,
  ingredientes: [String],
  instrucciones: [String],
  // id_usuario: Number,
  // photo: data,
  clasificacion: {
    categoria: [String],
    carne: Boolean,
    lacteo: Boolean,
    parve: Boolean
    // ,vegetariano: Boolean,
    // vegano: Boolean,
    // celiaco: Boolean,
    // pesaj: Boolean
  },
  fecha: Date
});

const commentSchema = mongoose.Schema({
  fecha: Date,
  id_usuario: Number,
  contenido: String,
  calificacion: Number,
  id_receta: Number
});

// MONGOOSE MODELS
const Recipe = mongoose.model("Recipe", recipeSchema);
const Comment = mongoose.model("Comment", commentSchema);
// GET METHODS

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/results/:category", function(req, res) {
  console.log("category:", req.params.category);
  res.render("results", {
    categoryName: _.capitalize(req.params.category)
  });
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

app.get("/recipes/:recipeId", function(req,res){

  const requestedRecipeId = req.params.recipeId;

Recipe.findOne({_id: requestedRecipeId}, function(err, foundRecipe){
  res.render("recipe", {recipe: foundRecipe});
});

});

// POST METHODS

app.post("/results", function(req, res) {
  // console.log(req.body.searchQuery);
  res.redirect("/results/" + req.body.searchQuery)
})

app.post("/new-recipe", function(req, res) {
  // console.log(req.body.dulce);
  const ingredientsArray = req.body.ingredientes.split(/\r\n|\r|\n/g);
  const instructionsArray = req.body.instrucciones.split(/\r\n|\r|\n/g);

  let newRecipeCategories = [];

  if (req.body.entrada) {
    newRecipeCategories.push("entrada");
  }

  if (req.body.platoFuerte) {
    newRecipeCategories.push("platoFuerte");
  }

  if (req.body.sefaradi) {
    newRecipeCategories.push("sefaradi");
  }

  if (req.body.dulce) {
    newRecipeCategories.push("dulce");
  }

  if (req.body.shabat) {
    newRecipeCategories.push("shabat");
  }

  if (req.body.ashkenazi) {
    newRecipeCategories.push("ashkenazi");
  }



  const newRecipe = new Recipe({
    titulo: req.body.titulo,
    cantidad_porciones: req.body.cantidad_porciones,
    descripcion: req.body.descripcion,
    ingredientes: ingredientsArray,
    instrucciones: instructionsArray,
    // photo: data,
    clasificacion: {
      categoria: newRecipeCategories,
      carne: false,
      lacteo: false,
      parve: false
    },
    fecha: Date.now(),
    nombre_autor: first_name,
    apellido_autor: last_name,
    mail_autor: email
  })

  switch (req.body.kashrut) {
    case "carne":
      newRecipe.clasificacion.carne = true;
      break;
    case "lacteo":
      newRecipe.clasificacion.lacteo = true;
      break;
    case "parve":
      newRecipe.clasificacion.parve = true;
      break;
    default:
  }

  newRecipe.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("New recipe has been succesfully saved.");
      res.redirect("/");
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server succesfully running");
});
