const Task = require("../models/Task.model");
const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
async function userSignUp(req, res) {
  const { name, email, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    if (await User.findOne({ email })) return res.send("User already exists");
    let user = await User.create({
      name,
      password: hashedPassword,
      email,
      role,
    });
  } catch (err) {
    return res.send("Registration Failed");
  }
  return res.send("Registered Seccussfully");
}
async function userLogin(req, res) {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) return res.send("Eighter wrong email or Password");
    let verification = await bcrypt.compare(password, user.password);
    if (!verification) return res.send("Eighter wrong email or Password");
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    return res.cookie("token", token).send("Login successful");
  } catch (err) {
    return res.send("Something went Wrong");
  }
}
function userLogout(req, res) {
  res.clearCookie("token");
}
module.exports = { userSignUp, userLogin, userLogout };
