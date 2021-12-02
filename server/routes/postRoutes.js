const express = require("express");
const router = express.Router();

const { postCreation, getPosts, getPost ,updatePost, deletePost, getSearchPosts } = require("../controllers/postController");

router.post("/create", postCreation);
router.post("/search", getSearchPosts);
router.get("/show", getPosts);
router.get("/:id", getPost);
router.put("/update", updatePost);
router.delete("/delete/:id", deletePost);

module.exports = router