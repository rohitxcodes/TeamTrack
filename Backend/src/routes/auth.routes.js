const express = require("express");
const restrictedUserOnly = require("../middleware/auth.middleware");
const {
  userLogin,
  userSignUp,
  userLogout,
  getMe,
} = require("../controllers/auth.controller");
const router = express.Router();
router.post("/register", userSignUp);
router.post("/login", userLogin);

router.use(restrictedUserOnly);
router.post("/logout", userLogout);
router.get("/me", getMe);
module.exports = router;
