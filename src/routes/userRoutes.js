const express = require("express");

const controller = require("../controllers/userController");
const validator = require("../lib/validators/userValidator");

const auth = require("../lib/middlewares/auth");

const app = express.Router();

const multer = require("multer");
const upload = multer({ dest: "uploads" });

// http://localhost:3007

// 1) /user

app.patch(
  "/update",
  auth,
  upload.single("file"),
  validator.update,
  controller.update
);

//app.get("/", controller.getCurrentUser);

// 2)  /user/signup
app.post("/signup", validator.signup, controller.signup);

// 3)  /user/login
app.post("/login", validator.login, controller.login);

// 4)  /user/logout
//app.post("/logout", controller.logout);

module.exports = app;
