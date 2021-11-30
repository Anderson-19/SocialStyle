const express = require("express");
const router = express.Router();


const { addPost, getPosts, followingPosts, userPost } = require("../controllers/postController");

router.post("/add", addPost);
router.get("/", getPosts);
router.get("/following", followingPosts);
router.get("/:userId", userPost);

module.exports = router


