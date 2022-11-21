const express = require("express");
const controller = require("../controllers/photosController");
const validator = require("../lib/validators/photosValidator");
require("express-async-errors");
const auth = require("../lib/middlewares/auth");
const multer = require("multer");
const app = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg"); //Appending .jpg
  },
});

const upload = multer({ storage: storage });

// -> photos/upload-photo
app.post(
  "/upload-photo",
  auth,
  upload.single("file"),
  validator.uploadPhoto,
  controller.uploadPhoto
);

// ->  photos/account
app.get("/account", auth, controller.getAllPhotos);

// -> photos
app.get("/", controller.getAllPhotos);

//-> photos/:id
app.get("/:id", controller.getPhotoById);
module.exports = app;
