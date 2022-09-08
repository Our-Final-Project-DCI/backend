const mongoose = require("mongoose");

const photoSchema = mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  category: { type: String, enum: ["nature", "arts", "Autos"], required: true },
  title: String,
  location: String,
  photoFile: { type: String, required: true },
  //comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  //likedPhotos: [],
  totalLikes: Number,
});

module.exports = mongoose.model("Photo", photoSchema, "photos");