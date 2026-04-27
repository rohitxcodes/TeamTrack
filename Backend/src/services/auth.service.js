const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";

function getCookieOptions() {
  const isProd = process.env.NODE_ENV === "production";

  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000,
  };
}

async function signUpUser({ name, email, password, role }) {
  if (!name || !email || !password) {
    return {
      status: 400,
      body: { message: "Name, email and password are required" },
    };
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { status: 409, body: { message: "User already exists" } };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      role,
      password: hashedPassword,
    });

    return {
      status: 201,
      body: {
        message: "Registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    };
  } catch (error) {
    return { status: 500, body: { message: "Registration failed" } };
  }
}

async function loginUser({ email, password }) {
  if (!email || !password) {
    return {
      status: 400,
      body: { message: "Email and password are required" },
    };
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return {
        status: 401,
        body: { message: "Either wrong email or password" },
      };
    }

    const verified = await bcrypt.compare(password, user.password);
    if (!verified) {
      return {
        status: 401,
        body: { message: "Either wrong email or password" },
      };
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return {
      status: 200,
      cookie: { token, options: getCookieOptions() },
      body: {
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
    };
  } catch (error) {
    return { status: 500, body: { message: "Something went wrong" } };
  }
}

function logoutUser() {
  return {
    status: 200,
    clearCookieOptions: getCookieOptions(),
    body: { message: "Logout successful" },
  };
}

function getAuthenticatedUserPayload(user) {
  return {
    status: 200,
    body: {
      message: "Authenticated user",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  };
}

module.exports = {
  signUpUser,
  loginUser,
  logoutUser,
  getAuthenticatedUserPayload,
};
