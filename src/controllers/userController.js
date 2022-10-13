const User = require("../models/User");

// um fils zu lesen
const path = require("path");
const fs = require("fs/promises");
const security = require("../lib/security");

// 1. signup
/** @type {import("express").RequestHandler} */
exports.signup = async (req, res, next) => {
  const newUser = await new User(req.body);

  newUser.password = await security.encrypt(newUser.password, 10);
  newUser.token = security.createToken();

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

  const correctPws = await security.compare(password, userFound.password);
  if (!correctPws) {
    const error = new Error("This password is not correct!!");
    error.status = 401;
    return next(error);
  }

  userFound.token = security.createToken();
  await userFound.save();

  res.cookie("user-token", userFound.token, {
    maxAge: 900000,
    sameSite: "strict",
    httpOnly: true,
  });

  res.status(200).send(userFound);
};

// 3. update:
/** @type {import("express").RequestHandler} */
exports.update = async (req, res, next) => {
  const { fullname, land, city, description, gender, likedPhotos } = req.body;

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
  if (likedPhotos) {
    user.likedPhotos = likedPhotos;
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

// 4. getCurrentUser:
/** @type {import("express").RequestHandler} */
exports.getCurrentUser = async (req, res, next) => {
  const token = req.cookies["user-token"];
  if (!token) {
    return res.status(200).json(null);
  }
  const user = await User.findOne().where("token").equals(token);
  return res.status(200).json(user);
};

// 5. logout:
/** @type {import("express").RequestHandler} */
exports.logout = async (req, res, next) => {
  const token = req.cookies["user-token"];

  const user = await User.findOne().where("token").equals(token);
  if (user) {
    user.token = "";
    await user.save();
  }

  res.cookie("user-token", "", {
    maxAge: 1,
    sameSite: "strict",
    httpOnly: true,
  });
  res.status(200).send();
};
