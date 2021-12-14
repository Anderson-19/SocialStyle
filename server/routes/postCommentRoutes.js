const express = require("express");
const router = express.Router();

const { commentCreation, getComments, deleteComment } = require("../controllers/postCommentController");

router.post("/create", commentCreation);
router.get("/show", getComments);
router.delete("/delete/:id", deleteComment);

module.exports = router