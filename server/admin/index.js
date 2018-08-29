const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home", {
    title: "Dashboard"
  });
});

router.get("/courses", (req, res) => {
  res.render("courses", {
    title: "Courses"
  });
});
router.get("/lessons", (req, res) => {
  res.render("lessons", {
    title: "Lessons"
  });
});

module.exports = router;
