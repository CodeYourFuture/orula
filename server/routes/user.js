const express = require("express");
const router = express.Router();
const db = require("../helpers/db");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

/* GET user profile. */
router.get("/profile", async (req, res, next) => {
  const { user_id: userId } = req.user;

  const profile = await db.getUserProfile(userId);
  res.send(profile);
});
/* PUT user profile. */
router.put("/profile", async (req, res, next) => {
  const { user_id: userId } = req.user;
  const { name, email, password } = req.body;
  await db.updateUserProfile(userId, name, email, password);
  res.send("The user has been updated");
});

module.exports = router;
