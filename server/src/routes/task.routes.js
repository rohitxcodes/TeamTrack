const express = require("express");
const restrictedUserOnly = require("../middleware/auth.middleware");

const router = express.Router();
router.use(restrictedUserOnly);
router.get("/my", (req, res) => {
  return res.send("task emploies routes get tasks");
});
router.patch("/:id/status", (req, res) => {
  return res.send("task emploies routes patch tasks task emploies");
});
router.get("/:id", (req, res) => {
  return res.send("task emploies routes get all users");
});

module.exports = router;
