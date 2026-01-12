// app.js: Express app setup (middleware + routes only)
const express = require("express");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const { userSignUp, userLogin } = require("./controllers/auth.controller");
const app = express();

connectDB();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//demo route
app.post("/register", userSignUp);
app.post("/login", userLogin);

module.exports = app;
