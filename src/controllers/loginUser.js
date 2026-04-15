const bcrypt = require("bcrypt");
const User = require("../models/User");

module.exports = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.redirect("/auth/login");
    }

    const same = await bcrypt.compare(password, user.password);

    if (!same) {
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