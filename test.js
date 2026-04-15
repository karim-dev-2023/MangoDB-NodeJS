const express = require("express");
const mongoose = require("mongoose");
const BlogPost = require("./src/models/blogPost.js");

const app = express();
const PORT = 3000;

// Connexion à MongoDB
async function main() {
  await mongoose
    .connect("mongodb://127.0.0.1/my_blog_minotaure")
    .then(() => console.log("Connected!"))
    .catch((err) => console.log("Connection failed", err));
}

main();

// // Création d'un post
// BlogPost.create({
//   title: "My first blog post",
//   body: "This is the content of my first blog post.",
// })
//   .then((blogPost) => {
//     console.log("Blog post created:", blogPost);
//   })
//   .catch((err) => {
//     console.error("Error creating blog post:", err);
//   });

//   Récupération de tous les posts
BlogPost.find()
  .then((blogPost) => {
    console.log("Blog posts found:", blogPost);
  })
  .catch((err) => {
    console.error("Error finding blog posts:", err);
  });

// Récupération d'un post par ID
let id = "69df65a5c49146c48559c138"; // Remplacez par un ID valide de votre base de données
BlogPost.findById(id)
  .then((blogPost) => {
    console.log("Blog post found:", blogPost);
  })
  .catch((err) => {
    console.error("Error finding blog post:", err);
  });

BlogPost.findByIdAndDelete("69df6944dbe354b35b44c9f5")
  .then((blogPost) => {
    console.log("Blog post deleted:", blogPost);
  })
  .catch((err) => {
    console.error("Error deleting blog post:", err);
  });

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
