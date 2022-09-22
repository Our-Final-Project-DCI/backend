const Photo = require("../models/Photo");

// um fils zu lesen

const path = require("path");
const fs = require("fs/promises");

// uploadPhoto
/** @type {import("express").RequestHandler} */
exports.uploadPhoto = async (req, res, next) => {
  const photo = await new Photo(req.body);
  photo.photoFile = req.file.path;

  await photo.save();

  res.status(200).send(photo);
};
// getAllPhotos
/** @type {import("express").RequestHandler} */
exports.getAllPhotos = async (req, res, next) => {
  const photos = await Photo.find();
  res.status(200).send(photos);
};
