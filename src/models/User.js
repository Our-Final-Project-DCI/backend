const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: String,
  avatar: String,
  gender: { type: String, enum: ["Male", "Female"] },
  city: String,
  land: String,
  description: String,
  // socialMedias: [
  //   {
  //     platform: String,
  //     link: String,
  //   },
  // ],
});

module.exports = mongoose.model("User", userSchema, "users");
