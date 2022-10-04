const { body } = require("express-validator");
// error validator importieren:
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
    .notEmpty()
    .isIn(["Male", "Female"])
    .withMessage("you must select : female or male"),
  body("fullname").optional().trim(),
  body("city").optional().trim(),
  body("land").optional().trim(),
  body("description").optional().trim(),
  /* body(
    "socialMedias",
    "socialMedias must be an array with min single value"
  ).isArray({ min: 1 }),
  body("socialMedias.*.platform", "platform must be a string").isLength({
    min: 1,
  }),
  body("socialMedias.*.link", "link must be a string").isLength({ min: 1 }), */
  errorsValidator,
];
