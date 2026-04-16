const User = require("../models/User");

module.exports = async (req, res) => {
  const { username, password } = req.body;

  const user = new User({ username, password });

  user
    .save()
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.error("Error saving user:", err);
      const validationErrors = Object.keys(err.errors).map((key) => err.errors[key].message);
      // req.session.validationErrors = validationErrors;
      req.flash("validationErrors", validationErrors);
      req.flash("data", req.body);
      return res.redirect("/auth/register");
    });
};
