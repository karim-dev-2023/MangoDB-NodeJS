const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: String,
  body: String,
  username: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: String, // Champ pour stocker le chemin de l'image
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;