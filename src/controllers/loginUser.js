const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      const same = await bcrypt.compare(password, user.password);

      if (same) {
        console.log("Perfect");
        
        return res.redirect('/');
      } else {
        return res.redirect('/auth/login');
      }
    } else {
      return res.redirect('/auth/login');
    }

  } catch (error) {
    console.error(error);
    res.redirect('/auth/login');
  }
};