const User = require("../models/User");

module.exports = async (req, res) => {
  try {
    const user = await User.create(req.body);
    console.log(user);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.render("register", { error: "Erreur création utilisateur" });
  }
};