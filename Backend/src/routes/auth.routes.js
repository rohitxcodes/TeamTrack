const express = require("express");
const restrictedUserOnly = require("../middleware/auth.middleware");
const {
  userLogin,
  userSignUp,
  userLogout,
} = require("../controllers/auth.controller");
const router = express.Router();
router.post("/register", userSignUp);
router.post("/login", userLogin);

router.use(restrictedUserOnly);
router.post("/logout", userLogout);
router.get("/me", (req, res) => {
  return res.status(200).json({
    message: "Authenticated user",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
});
module.exports = router;
