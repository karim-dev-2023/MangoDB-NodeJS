const BlogPost = require("../models/blogPost.js");

module.exports = async (req, res) => {
    const blogPosts = await BlogPost.find({}).populate('userid')
    console.log(blogPosts);

    res.render('list', {
        blogPosts
    });
}