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
  console.log(req.query);
  const own = req.query.own;
  const liked = req.query.liked;

  if (liked) {
    await req.user.populate("likedPhotos");
    res.status(200).send(req.user.likedPhotos);
    return;
  }

  let dbQuery = Photo.find();

  if (own) {
    dbQuery = dbQuery.where("user").equals(req.user._id);
  }
  // Photo.find().where("user").equals(user._id);
  console.log(own);

  const photos = await dbQuery.populate("user");
  console.log(photos);
  res.status(200).send(photos);
};
