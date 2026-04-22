const Task = require("../models/Task.model");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
  };
}

async function userSignUp(req, res) {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, email and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    if (await User.findOne({ email })) {
      return res.status(409).json({ message: "User already exists" });
    }

    let user = await User.create({
      name,
      password: hashedPassword,
      email,
      role,
    });

    return res.status(201).json({
      message: "Registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Registration failed" });
  }
}

async function userLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Either wrong email or password" });
    }

    let verification = await bcrypt.compare(password, user.password);
    if (!verification) {
      return res
        .status(401)
        .json({ message: "Either wrong email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return res
      .cookie("token", token, getCookieOptions())
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (err) {
    return res.status(500).json({ message: "Something went wrong" });
  }
}

function userLogout(req, res) {
  res.clearCookie("token", getCookieOptions());
  return res.status(200).json({ message: "Logout successful" });
}

module.exports = { userSignUp, userLogin, userLogout };
