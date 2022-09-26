const mongoose = require("mongoose");

const photoSchema = mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  category: {
    type: String,
    enum: ["Nature", "Arts", "Cars", "Fashions", "Foods", "Others", "Animals"],
    required: true,
  },
  title: String,
  location: String,
  photoFile: { type: String, required: true },
  //comments: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  likedPhotos: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Photo" }],
  //isFav: Boolean,
  totalLikes: Number,
});

module.exports = mongoose.model("Photo", photoSchema, "photos");
