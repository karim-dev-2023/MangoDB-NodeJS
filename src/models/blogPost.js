const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
  title: { type: String, required: [true, "Title is required"] },
  body: { type: String, required: [true, "Body is required"] },
  // username: String,
  userid:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: String, // Champ pour stocker le chemin de l'image
});

const BlogPost = mongoose.model("BlogPost", BlogPostSchema);

module.exports = BlogPost;
