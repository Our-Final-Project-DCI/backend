const User = require("../models/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// um fils zu lesen

const path = require("path");
const fs = require("fs/promises");

// 1. signup
/** @type {import("express").RequestHandler} */
exports.signup = async (req, res, next) => {
  const newUser = await new User(req.body);

  newUser.password = await bcrypt.hash(newUser.password, 10);
  newUser.token = crypto.randomBytes(64).toString("hex");

  await newUser.save();

  res.cookie("user-token", newUser.token, {
    maxAge: 900000,
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
    maxAge: 900000,
    sameSite: "strict",
    httpOnly: true,
  });

  res.status(200).send(userFound);
};

// 2. update:
/** @type {import("express").RequestHandler} */
exports.update = async (req, res, next) => {
  const { fullname, land, city, description, gender } = req.body;

  const user = req.user;
  if (fullname) {
    user.fullname = fullname;
  }

  if (land) {
    user.land = land;
  }

  if (city) {
    user.city = city;
  }

  if (description) {
    user.description = description;
  }

  if (gender) {
    user.gender = gender;
  }

  if (req.file) {
    const filename = path.join(process.cwd(), req.file.path);
    const buffer = await fs.readFile(filename);
    const image = `data:${req.file.mimetype};base64,${buffer.toString(
      "base64"
    )}`;

    user.avatar = image;

    await fs.unlink(filename);
  }

  await user.save();

  res.status(200).send(user);
};
