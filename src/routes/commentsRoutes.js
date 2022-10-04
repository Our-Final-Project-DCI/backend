const Comment = require("../models/Comment");
require("express-async-errors");
const express = require("express");

const controller = require("../controllers/commentsController");
const validator = require("../lib/validators/commentValidator");
const auth = require("../lib/middlewares/auth");

const app = express.Router();

app.post("/",auth,validator.createComment,controller.createComment);

module.exports = app;
