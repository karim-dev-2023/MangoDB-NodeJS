const express = require("express");
const mongoose = require("mongoose");
const BlogPost = require("./src/models/blogPost.js");
const path = require("path");
const fileUpload = require("express-fileupload");
const expressSession = require("express-session");
const flash = require("connect-flash");

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
const logoutController = require("./src/controllers/logout.js");
require("dotenv").config();

// Middleware de validation
const validateMiddleware = require("./src/middlewares/validateMiddleware.js");
const authMiddleware = require("./src/middlewares/authMiddleware.js");
const redirectIfAuthenticatedMiddleware = require("./src/middlewares/redirectIfAuthenticatedMiddleware.js");

const app = express();

// Middleware pour gérer le téléchargement de fichiers
app.use(fileUpload());

// Connexion à MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/my_blog")
  .then(() => console.log("Connexion MongoDB réussie"))
  .catch((err) => console.error("Erreur de connexion à MongoDB:", err));
// mongoose
//   .connect("mongodb+srv://mn_db_user:1844@cluster0.bhix0hm.mongodb.net/my_blog")
//   .then(() => console.log("Connexion MongoDB réussie"))
//   .catch((err) => console.error("Erreur de connexion à MongoDB:", err));

// Définir EJS comme moteur de template
app.set("view engine", "ejs");

// Dossier des fichiers statiques (CSS, JS…)
app.use(express.static("public"));
app.use(express.json()); // Pour parser les données JSON
app.use(express.urlencoded({ extended: true })); // Pour parser les données des formulaires
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
); // Configuration de la session

global.loggedIn = null;
app.use((req, res, next) => {
  global.loggedIn = req.session.userId || null;
  next();
});

app.use(flash()); // Middleware pour les messages flash
// Route principale
app.get("/", homeController);

app.get("/post/new", authMiddleware, newPostController); 

// Route pour créer un nouveau post avec gestion de l'upload d'image
app.post("/post/store", storePostController, validateMiddleware);

// Route pour afficher la liste des posts
app.get("/list", listPostController);

app.get("/post/:id", getPostController);

app.get("/auth/register", redirectIfAuthenticatedMiddleware, newUserController);

app.post(
  "/user/register",
  redirectIfAuthenticatedMiddleware,
  storeUserController,
);

app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);

app.post("/user/login", redirectIfAuthenticatedMiddleware, loginUserController);

app.get("/auth/logout", authMiddleware, logoutController);

app.use((req, res) => res.render("notfound"));
// Lancer le serveur
app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
