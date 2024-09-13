const body = require("express-validator").body;

const loginValidator = [
  body("email").trim().isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password should atleast be of 6 characters"),
];

const signupValidator = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  ...loginValidator,
];

const chatCompleteValidator = [
  body("message").trim().notEmpty().withMessage("Message not sent!"),
];

module.exports = { signupValidator, loginValidator, chatCompleteValidator };
