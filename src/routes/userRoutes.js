const express = require("express");

const controller = require("../controllers/userController");
const validator = require("../lib/validators/userValidator");

const app = express.Router();

// http://localhost:3007

// 1) /user

//app.get("/", controller.getCurrentUser);

// 2)  /user/signup
app.post("/signup", validator.signup, controller.signup);

// 3)  /user/login
app.post("/login", validator.login, controller.login);

// 4)  /user/logout
//app.post("/logout", controller.logout);

module.exports = app;
