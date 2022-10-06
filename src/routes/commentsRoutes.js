const express = require("express");
const controller = require("../controllers/commentsController");
const validator = require("../lib/validators/commentValidator");
require("express-async-errors");
const auth = require("../lib/middlewares/auth");
const app = express.Router();

// -> comments/
app.post("/", auth, validator.createComment, controller.createComment);

module.exports = app;
