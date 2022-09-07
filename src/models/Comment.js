const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  photo: { type: mongoose.SchemaTypes.ObjectId, ref: "Photo", required: true },
  description: { type: String },
});

module.exports = mongoose.model("Comment", commentSchema, "comments");
