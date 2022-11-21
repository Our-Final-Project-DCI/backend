const { body } = require("express-validator");
const errorsValidator = require("../middlewares/errorsValidator");

exports.createComment = [
  body("description").optional().trim(),
  errorsValidator,
];
