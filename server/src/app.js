// app.js: Express app setup (middleware + routes only)
const express = require("express");
const connectDB = require("./config/db");
const app = express();
connectDB();
app.get("/", (req, res) => {
  res.send(`working`);
});
module.exports = app;
