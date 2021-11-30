const express = require("express");
const router = express.Router();

const { postCreation, getPosts, updatePost, deletePost } = require("../controllers/postController");

router.post("/create", postCreation);
router.get("/show", getPosts);
router.put("/update", updatePost);
router.delete("/delete", deletePost);

module.exports = router