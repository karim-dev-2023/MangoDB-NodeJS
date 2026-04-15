const express = require("express");
const mongoose = require("mongoose");
const BlogPost = require("./src/models/blogPost.js");
const path = require("path");
const fileUpload = require("express-fileupload");

// Controllers
const newPostController = require("./src/controllers/newPost.js");
const homeController = require("./src/controllers/home.js");
const storePostController = require("./src/controllers/storePost.js");
const listPostController = require("./src/controllers/listPost.js");
const getPostController = require("./src/controllers/getPost.js");

const app = express();

const validateMiddleware = (req, res, next) => {
  if (req.files == null || req.body.title == null || req.body.body == null) {
    return res.redirect("/post/new");
  }
  next();
};

// Middleware pour gérer le téléchargement de fichiers
app.use(fileUpload());

// Connexion à MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/my_blog")
  .then(() => console.log("Connexion MongoDB réussie"))
  .catch((err) => console.error("Erreur de connexion à MongoDB:", err));

// Définir EJS comme moteur de template
app.set("view engine", "ejs");

// Dossier des fichiers statiques (CSS, JS…)
app.use(express.static("public"));
app.use(express.json()); // Pour parser les données JSON
app.use(express.urlencoded({ extended: true })); // Pour parser les données des formulaires

// Route principale
app.get("/", homeController);

app.get("/post/new", newPostController);

// Route pour créer un nouveau post avec gestion de l'upload d'image
app.post("/post/store", validateMiddleware, storePostController);

// Route pour afficher la liste des posts
app.get("/list", listPostController); 

app.get("/post/:id", getPostController); 

// Lancer le serveur
app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
