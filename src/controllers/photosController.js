const Photo = require("../models/Photo");

// um fils zu lesen

const path = require("path");

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
// getPhotoById
/** @type {import("express").RequestHandler} */
exports.getPhotoById = async (req, res, next) => {
  const id = req.params.id;
  const photo = await Photo.findById(id).populate("user");

  if (!photo) {
    const error = new Error("This photo-Id is not correct!!");
    error.status = 400;

    return next(error);
  }
  res.status(200).send(photo);
};
