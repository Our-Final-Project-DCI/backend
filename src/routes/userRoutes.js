const express = require("express");
const controller = require("../controllers/userController");
const validator = require("../lib/validators/userValidator");
require("express-async-errors");
const auth = require("../lib/middlewares/auth");
const app = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });

// -> /user/update
app.patch(
  "/update",
  auth,
  upload.single("file"),
  validator.update,
  controller.update
);

// -> /user
app.get("/", controller.getCurrentUser);

// ->  /user/signup
app.post("/signup", validator.signup, controller.signup);

// ->  /user/login
app.post("/login", validator.login, controller.login);

// ->  /user/logout
app.post("/logout", controller.logout);

module.exports = app;
