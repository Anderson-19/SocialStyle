const express = require("express");
const router = express.Router();

const { userRegistration, userLogin, getUserProfile, userFollower, userUnFollow } = require("../controllers/userController");

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.get("/profile/:id", getUserProfile);

router.post("/follow", userFollower);
router.delete("/unfollow", userUnFollow);

module.exports = router