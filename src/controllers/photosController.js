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
  const category = req.query.category;
  const search = req.query.search;

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

  if (category) {
    dbQuery = dbQuery.where("category").equals(category);
  }

  if (search) {
    dbQuery = dbQuery.or([
      { title: { $regex: search, $options: "i" } },
      /* {"description": {$regex: search, $options: "i" }} */
    ]);
  }

  const photos = await dbQuery.populate("user");

  res.status(200).send(photos);
};

// getPhotoById
/** @type {import("express").RequestHandler} */
exports.getPhotoById = async (req, res, next) => {
  const id = req.params.id;
  const photo = await Photo.findById(id).populate("user").populate("comments");

  await Promise.all(
    photo.comments.map(async (comment) => {
      await comment.populate("user", "username avatar"); // 2
    })
  );

  if (!photo) {
    const error = new Error("This photo-Id is not correct!!");
    error.status = 400;

    return next(error);
  }
  res.status(200).send(photo);
};
