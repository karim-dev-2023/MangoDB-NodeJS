const BlogPost = require("../models/blogPost.js");
module.exports = (req, res) => {
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
};

