const express = require("express");
const mongoose = require("mongoose");
const BlogPost = require("./src/models/blogPost.js");
const path = require("path");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");

// Controllers
const newPostController = require("./src/controllers/newPost.js");
const homeController = require("./src/controllers/home.js");
const storePostController = require("./src/controllers/storePost.js");
const listPostController = require("./src/controllers/listPost.js");
const getPostController = require("./src/controllers/getPost.js");
const newUserController = require("./src/controllers/newUser.js");
const storeUserController = require("./src/controllers/storeUser.js");
const loginController = require("./src/controllers/login.js");
const loginUserController = require("./src/controllers/loginUser.js");

// Middleware de validation
const validateMiddleware = require("./src/middlewares/validateMiddleware.js");

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
app.use(
  expressSession({
    secret: "X9rfdsffddytsgvgbdjkdsvlfdsqwxfghjntuy",
    resave: false,
    saveUninitialized: false,
  }),
); // Configuration de la session

// Route principale
app.get("/", homeController);

app.get("/post/new", newPostController);

// Route pour créer un nouveau post avec gestion de l'upload d'image
app.post("/post/store", validateMiddleware, storePostController);

// Route pour afficher la liste des posts
app.get("/list", listPostController);

app.get("/post/:id", getPostController);

app.get("/auth/register", newUserController);

app.post("/user/register", storeUserController);

app.get("/auth/login", loginController);

app.post("/user/login", loginUserController);
// Lancer le serveur
app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
