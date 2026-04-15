const express = require("express");
const mongoose = require("mongoose");
const BlogPost = require("./src/models/blogPost.js");
const app = express();

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

// Route pour créer un nouveau post
app.post("/post/store", async (req, res) => {
  console.log("Touch");

  const { title, body } = req.body;

  BlogPost.create({ title, body })
    .then((blogPost) => {
      console.log("Blog post created:", blogPost);
      res.redirect("/"); // Redirige vers la page d'accueil après la création du post
    })
    .catch((err) => {
      console.error("Error creating blog post:", err);
      res.render("create", { title: "Nouveau Post - Creations" });
    });
});

// Route pour afficher la liste des posts
app.get("/list", (req, res) => {
  BlogPost.find()
    .then((blogPosts) => {
      res.render("list", { blogPosts, title: "Liste des Posts " });
    })
    .catch((err) => {
      console.error("Error fetching blog posts:", err);
      res.render("list", { blogPosts: [], title: "Liste des Posts " });
    });
});

app.get("/post/:id", (req, res) => {
  const postId = req.params.id;

  BlogPost.findById(postId)
    .then((blogPost) => {
      if (!blogPost) {
        return res.status(404).render("404");
      }
      res.render("post", { blogPost, title: blogPost.title });
    })
    .catch((err) => {
      console.error("Error fetching blog post:", err);
      res.status(500).render("500");
    });
});

// Lancer le serveur
app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
