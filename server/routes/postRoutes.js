const express = require("express");


const { addPost, getPosts, followingPosts, userPost } = require("../controllers/postController");

router.post("/add", addPost);
router.get("/", getPosts);
router.get("/following", followingPosts);
router.get("/:userId", userPost);


