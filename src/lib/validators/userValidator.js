const { body } = require("express-validator");

exports.signup = [
  body("username")
    .isLength({ min: 2 })
    .withMessage("username should have min 2 letter "),
  body("email").isEmail().withMessage("invalid Email improve your Email"),
  body("password")
    .isStrongPassword()
    .isLength({ min: 8 })

    .withMessage("your Password is not strong , improve your password"),
];

exports.login = [
  body("email").isEmail().withMessage("invalid Email improve your Email"),
  body("password")
    .isStrongPassword()
    .withMessage("your Password is not strong , improve your password"),
];

//exports.update = [];
