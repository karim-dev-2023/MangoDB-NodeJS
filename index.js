const express = require("express");
const mongoose = require("mongoose");
const app = express();


// Connexion à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/my_blog')
  .then(() => console.log('Connexion MongoDB réussie'))
  .catch((err) => console.error('Erreur de connexion à MongoDB:', err));

// Définir EJS comme moteur de template
app.set("view engine", "ejs");

// Dossier des fichiers statiques (CSS, JS…)
app.use(express.static("public"));

// Route principale
app.get("/", (req, res) => {
  res.render("index");
});

// Route About
app.get("/about", (req, res) => {
  res.render("about");
});

// Route Contact
app.get("/contact", (req, res) => {
  res.render("contact");
});

// Route Post
app.get("/post", (req, res) => {
  res.render("post");
});

app.get("/post/new", (req, res) => {
  res.render("create");
});

// Lancer le serveur
app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
