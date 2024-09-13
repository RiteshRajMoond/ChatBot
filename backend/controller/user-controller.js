const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { validationResult } = require("express-validator");
const { generateToken } = require("../utils/token-manager");
const { COOKIE_NAME } = require("../utils/constants");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

exports.signup = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user._id.toString(), user.email);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(201)
      .json({ message: "User Created", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

exports.login = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    const token = generateToken(user._id.toString(), user.email);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({
      message: "Loggedin successfully",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

exports.logout = async (req, res, next) => {
  try {    
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.clearCookie(COOKIE_NAME, {
      path: "/",
      domain: "localhost",
      httpOnly: true,
      signed: true,
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

exports.verifyUser = async (req, res, next) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).json({
        message: "User not registered or Token not valid in verifyUser",
      });

    if (user._id.toString() !== res.locals.jwtData.id)
      return res.status(401).json({
        message: "User not registered or Token not valid in verifyUser",
      });

    return res
      .status(200)
      .json({ message: "User Verified", name: user.name, email: user.email });
  } catch (error) {
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
