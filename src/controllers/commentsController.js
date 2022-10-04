const Comment = require("../models/Comment");
const Photo = require("../models/Photo");

// uploadPhoto
/** @type {import("express").RequestHandler} */
exports.createComment = async (req, res, next) => {
  const comment = await new Comment(req.body);
  comment.user = req.user._id;

  const photo = await Photo.findById(comment.photo);

  if (!photo) {
    const error = new Error("invalid Photo-ID");
    error.status = 400;
    return next(error);
  }

  await comment.save();
  photo.comments.push(comment._id);

  await photo.save();
  console.log(comment, photo);
  res.status(200).send(comment);
};
