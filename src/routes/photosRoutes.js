const Photo = require("../models/Photo");
require("express-async-errors");

const express = require("express");

const controller = require("../controllers/photosController");
const validator = require("../lib/validators/photosValidator");

const auth = require("../lib/middlewares/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads" });

const app = express.Router();

// -> photos/upload-photo

app.post(
  "/upload-photo",
  auth,
  upload.single("file"),
  validator.uploadPhoto,
  controller.uploadPhoto
);

// -> photos/photos

app.get("/", auth, controller.getAllPhotos);

module.exports = app;
