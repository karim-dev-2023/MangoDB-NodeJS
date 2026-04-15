const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    const user = await User.findById(req.session.userId);

    if (!user) {
      return res.redirect("/auth/login");
    }

    next();
  } catch (error) {
    console.error(error);
    return res.redirect("/auth/login");
  }
};