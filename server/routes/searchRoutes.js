const express = require("express");
const router = express.Router();


const { searchTweet, getSearch } = require("../controllers/searchController");

router.post("/search-tweet", searchTweet);
router.get("/:id", getSearch);




module.exports = router