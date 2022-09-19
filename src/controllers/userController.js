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
