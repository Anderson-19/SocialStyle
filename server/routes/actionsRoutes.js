const express = require("express");
const router = express.Router();

const { giveLike, giveDislike, getLikes } = require("../controllers/actionsController");


router.post("/like", giveLike);
router.delete("/dislike/:id", giveDislike);
router.get("/likes", getLikes);

module.exports = router