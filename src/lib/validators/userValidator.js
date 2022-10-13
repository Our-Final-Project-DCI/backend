const { body } = require("express-validator");
const errorsValidator = require("../middlewares/errorsValidator");

exports.signup = [
  body("username")
    .exists()
    .trim()
    .isLength({ min: 3 })
    .withMessage("This username must me 3+ characters long "),
  body("email").trim().isEmail().withMessage("Email is not valid"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("your Password is not strong und must be +8 characters long"),
  errorsValidator,
];

exports.login = [
  body("email").trim().isEmail().withMessage("Email is not valid"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("your Password is not strong und must be +6 characters long"),
  errorsValidator,
];

exports.update = [
  body("gender")
    .optional()
    .isIn(["Male", "Female"])
    .withMessage("you must select : female or male"),
  body("fullname").optional().trim(),
  body("city").optional().trim(),
  body("land").optional().trim(),
  body("description").optional().trim(),
  errorsValidator,
];
