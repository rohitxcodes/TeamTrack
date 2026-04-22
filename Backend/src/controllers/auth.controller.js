const {
  signUpUser,
  loginUser,
  logoutUser,
  getAuthenticatedUserPayload,
} = require("../services/auth.service");

async function userSignUp(req, res) {
  const response = await signUpUser(req.body);
  return res.status(response.status).json(response.body);
}

async function userLogin(req, res) {
  const response = await loginUser(req.body);
  if (response.cookie) {
    res.cookie("token", response.cookie.token, response.cookie.options);
  }
  return res.status(response.status).json(response.body);
}

function userLogout(req, res) {
  const response = logoutUser();
  res.clearCookie("token", response.clearCookieOptions);
  return res.status(response.status).json(response.body);
}

function getMe(req, res) {
  const response = getAuthenticatedUserPayload(req.user);
  return res.status(response.status).json(response.body);
}

module.exports = { userSignUp, userLogin, userLogout, getMe };
