const express = require("express");
const mongoose = require("mongoose");
const BlogPost = require("./src/models/blogPost.js");
const path = require("path");
const fileUpload = require("express-fileupload");
const app = express();

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

// Route pour créer un nouveau post avec gestion de l'upload d'image
app.post("/post/store", (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "Title and body are required" });
  }

  const image = req.files && req.files.image ? req.files.image.name : null;

  image &&
    req.files.image.mv(path.join(__dirname, "public/images", image), (err) => {
      if (err) {
        console.error("Error uploading image:", err);
      } else {
        console.log("Image uploaded successfully");
        // create blog post after image upload
        BlogPost.create({ title, body, username: "Karim", image })
          .then((blogPost) => {
            console.log("Blog post created:", blogPost);
            res.redirect("/");
          })
          .catch((err) => {
            console.error("Error creating blog post:", err);
            res.render("create", { title: "Nouveau Post - Création" });
          });
      }
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
