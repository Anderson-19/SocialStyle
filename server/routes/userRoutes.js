const express = require("express");
const router = express.Router();

const { userRegistration } = require("../controllers/userController");

router.post("/register", userRegistration);

module.exports = router