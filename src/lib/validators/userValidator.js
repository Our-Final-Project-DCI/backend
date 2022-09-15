const { body } = require("express-validator");
// error validator importieren:
const errorsValidator = require("../middlewares/errorsValidator");

exports.signup = [
  body("username")
    .exists()
    .isString()
    .isLength({ min: 3 })
    .withMessage("This username must me 3+ characters long "),
  body("email")
    .trim()
    .isEmail()
    .notEmpty()
    .normalizeEmail()
    .withMessage("Email is not valid"),
  body("password")
    .isStrongPassword()
    .isLength({ min: 8 })
    .withMessage("your Password is not strong und must be +8 characters long"),
  errorsValidator,
];

exports.login = [
  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Email is not valid"),
  body("password")
    .isStrongPassword()
    .withMessage("your Password is not strong , improve your password"),
  errorsValidator,
];

//exports.update = [];
