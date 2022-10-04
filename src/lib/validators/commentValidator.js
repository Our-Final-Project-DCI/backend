const { body } = require("express-validator");
// error validator importieren:
const errorsValidator = require("../middlewares/errorsValidator");

exports.createComment = [
  body("description").optional().trim(),
  errorsValidator,
];
