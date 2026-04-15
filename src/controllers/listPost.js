const BlogPost = require("../models/blogPost.js");

module.exports = (req, res) => {
  BlogPost.find()
    .then((blogPosts) => {
      res.render("list", { blogPosts, title: "Liste des Posts " });
    })
    .catch((err) => {
      console.error("Error fetching blog posts:", err);
      res.render("list", { blogPosts: [], title: "Liste des Posts " });
    });
};
