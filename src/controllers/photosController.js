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

  const photos = await dbQuery.populate("user");

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
