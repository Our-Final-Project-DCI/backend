const Photo = require("../models/Photo");
require("express-async-errors");

const express = require("express");

const controller = require("../controllers/photosController");
const validator = require("../lib/validators/photosValidator");

const auth = require("../lib/middlewares/auth");
const multer = require("multer");
const upload = multer({ dest: "uploads" });

const app = express.Router();

//

app.post(
  "/upload-photo",
  auth,
  upload.single("file"),
  validator.uploadPhoto,
  controller.uploadPhoto
);

module.exports = app;
