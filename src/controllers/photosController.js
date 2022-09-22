const e = require("cors");
const Photo = require("../models/Photo");

// uploadPhoto
/** @type {import("express").RequestHandler} */
exports.uploadPhoto = async (req, res, next) => {
  const photo = await new Photo(req.body);
  const filename = req.file.path;

  photo.photoFile = filename;

  photo.user = req.user._id;

  await photo.save();

  res.status(200).send(photo);
};
// getAllPhotos
/** @type {import("express").RequestHandler} */
exports.getAllPhotos = async (req, res, next) => {
  const photos = await Photo.find().populate("user");
  res.status(200).send(photos);
};
