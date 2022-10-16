const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullname: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: String,
  likedPhotos: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Photo" }],
  avatar: String,
  gender: { type: String, enum: ["Male", "Female"] },
  city: String,
  land: String,
  description: String,
});

// userSchema.methods.toJSON = function () {
//   const user = this;
//   const result = {
//     username: user.username,
//     email: user.email,
//     avatar: user.avatar,
//     likedPhotos: user.likedPhotos,
//     description: user.description,
//     gender: user.gender,
//     city: user.city,
//     land: user.land,
//   };
//   return result;
// };
module.exports = mongoose.model("User", userSchema, "users");
