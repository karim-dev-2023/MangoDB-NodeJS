const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator").default;

const UserSchema = new Schema({
  username: { type: String, required: [true, "Username is required"], unique: [true, "Username is already taken"] },
  password: { type: String, required: [true, "Password is required"] }
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('User', UserSchema);

module.exports = User;