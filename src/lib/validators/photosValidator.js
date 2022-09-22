const { body } = require("express-validator");
// error validator importieren:
const errorsValidator = require("../middlewares/errorsValidator");

exports.uploadPhoto = [
  body("title").optional().trim(),
  body("category")
    .notEmpty()

    .isIn(["Nature", "Food", "Arts", "Cars", "Fashions", "Animals", "Other"])

    .withMessage("you must select : one category"),

  body("location").optional().trim(),
  body("description").optional().trim(),
  errorsValidator,
];
