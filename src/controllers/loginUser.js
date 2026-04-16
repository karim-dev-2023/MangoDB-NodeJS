const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    const same = await bcrypt.compare(password, user.password);

    if (!user || !same) {
      const validationErrors = ["Invalid username or password"];
      req.flash("validationErrors", validationErrors);
      req.flash("formData", { username, password });
      return res.redirect("/auth/login");
    }

    req.session.userId = user._id;
    console.dir(req.session);
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return res.redirect("/auth/login");
  }
};
