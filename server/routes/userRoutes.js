const express = require("express");
const router = express.Router();

const { userRegistration, userLogin, getUserProfile, userFollower, userUnFollow, getUsersFollowing, updateUserProfile } = require("../controllers/userController");

router.post("/register", userRegistration);
router.post("/login", userLogin);
router.get("/profile/:id", getUserProfile);
router.put("/editProfile", updateUserProfile);

router.post("/follow", userFollower);
router.delete("/unfollow", userUnFollow);
router.get("/followers", getUsersFollowing);

module.exports = router