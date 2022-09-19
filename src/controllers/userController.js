const User = require("../models/User");

const bcrypt = require("bcrypt");
const crypto = require("crypto");

// 1. signup
/** @type {import("express").RequestHandler} */
exports.signup = async (req, res, next) => {
  const newUser = await new User(req.body);

  newUser.password = await bcrypt.hash(newUser.password, 10);
  newUser.token = crypto.randomBytes(64).toString("hex");

  await newUser.save();

  res.cookie("user-token", newUser.token, {
    maxAge: 100000,
    sameSite: "strict",
    httpOnly: true,
  });

  res.status(200).send(newUser);
};

// 2. login
/** @type {import("express").RequestHandler} */
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const userFound = await User.findOne().where("email").equals(email);

  if (!userFound) {
    const error = new Error("This email adress is not FOUND!!");
    error.status = 401;
    return next(error);
  }

  const correctPws = await bcrypt.compare(password, userFound.password);
  if (!correctPws) {
    const error = new Error("This password is not correct!!");
    error.status = 401;
    return next(error);
  }

  userFound.token = crypto.randomBytes(64).toString("hex");

  res.cookie("user-token", userFound.token, {
    maxAge: 100000,
    sameSite: "strict",
    httpOnly: true,
  });

  res.status(200).send(userFound);
};
