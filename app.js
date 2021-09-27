const express = require('express');
// const bodyParser = require("body-parser");
const ejs = require('ejs');
const mongoose = require('mongoose');
var _ = require('lodash');

// file storage
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

/*const fileFilter = function (req, file, cb) {

  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
      // reject a file if its not jpeg, jpg or png
    cb(null, false);
  }
}*/

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  } /*,
  fileFilter: fileFilter */
});

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
app.use('/images', express.static("images"));
// MONGOOSE MONGODB CONNECT

// mongoose.connect('mongodb+srv://foodmaster:PIGSd0ntfly@cj-cluster.dztz8.mongodb.net/CJDB', {
mongoose.connect("mongodb://localhost:27017/CJDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var categoriesArray = ["entrada", "plato-fuerte", "sefaradi", "dulce", "shabat", "ashkenazi"];
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
  imagen: String,
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
  fecha: Date,
  nombre_autor: String,
  apellido_autor: String,
  mail_autor: String
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

app.get("/", function (req, res) {
  res.render("index");
});

// app.get("/results/:category", function (req,res) {

//   Recipe.find({
//     "clasificacion.categoria": req.params.category

//   }, function (err, recipes) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(recipes);
//       res.render("results", {
//         recipesFound: recipes
//       });
//     }
//   });

// });

app.get("/results/:query", function (req, res) {

  let zeroResults = true;
  if (categoriesArray.includes(req.params.query)) {
    Recipe.find({ //category search
      "clasificacion.categoria": req.params.query
    }, function (err, recipes) {
      if (err) {
        console.log(err);
      } else {
        recipes.length > 0 ? zeroResults = false : null;
        res.render("results", {
          recipesFound: recipes
        });
      }
    });
  } else {
    Recipe.find({ //title search
      titulo: {
        '$regex': req.params.query,
        '$options': 'i'
      }
    }, function (err, recipes) {
      if (err) {
        console.log(err);
      } else {
        recipes.length > 0 ? zeroResults = false : null;
        res.render("results", {
          recipesFound: recipes
        });
      }
    });
  }

});

app.get("/log-in", function (req, res) {
  res.render("log-in");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.get("/new-recipe", function (req, res) {
  res.render("new-recipe");
});

app.get("/recipes/:recipeId", function (req, res) {

  const requestedRecipeId = req.params.recipeId;

  Recipe.findOne({
    _id: requestedRecipeId
  }, function (err, foundRecipe) {
    res.render("recipe", {
      recipe: foundRecipe
    });
  });

});

// POST METHODS

app.post("/results", function (req, res) {

  res.redirect("/results/" + _.toLower(req.body.searchQuery));
})

app.post("/new-recipe", upload.single('imagenUsuario'), function (req, res) {

  const ingredientsArray = req.body.ingredientes.split(/\r\n|\r|\n/g);
  const instructionsArray = req.body.instrucciones.split(/\r\n|\r|\n/g);

  let newRecipeCategories = [];

  if (req.body.entrada) {
    newRecipeCategories.push("entrada");
  }

  if (req.body.platoFuerte) {
    newRecipeCategories.push("plato-fuerte");
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
    imagen: req.file.path,
    clasificacion: {
      categoria: newRecipeCategories,
      carne: false,
      lacteo: false,
      parve: false
    },
    fecha: Date.now(),
    nombre_autor: req.body.first_name,
    apellido_autor: req.body.last_name,
    mail_autor: req.body.email
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

  newRecipe.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("New recipe has been succesfully saved.");
      res.redirect("/");
    }
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log("Server succesfully running");
});
