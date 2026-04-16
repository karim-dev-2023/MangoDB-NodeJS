const path = require("path");
const BlogPost = require("../models/blogPost.js");

module.exports = (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    const validationErrors = [];
    if (!title) validationErrors.push("Title is required");
    if (!body) validationErrors.push("Body is required");
    req.flash("validationErrors", validationErrors);
     return res.redirect("/post/new");
  }

  const image = req.files && req.files.image ? req.files.image.name : null;

  if (image) {
    req.files.image.mv(
      path.join(__dirname, "../../public/images", image),
      (err) => {
        if (err) {
          console.error("Error uploading image:", err);
          return res.render("create", { title: "Nouveau Post - Création" });
        }

        BlogPost.create({ title, body, userid: req.session.userId, image })
          .then((blogPost) => {
            console.log("Blog post created:", blogPost);
            res.redirect("/");
          })
          .catch((err) => {
            console.error("Error creating blog post:", err);
            res.render("create", { title: "Nouveau Post - Création" });
          });
      }
    );
  } else {
    BlogPost.create({ title, body, userid: req.session.userId, image: null })
      .then((blogPost) => {
        console.log("Blog post created:", blogPost);
        res.redirect("/");
      })
      .catch((err) => {
        console.error("Error creating blog post:", err);
        res.render("create", { title: "Nouveau Post - Création" });
      });
  }
};