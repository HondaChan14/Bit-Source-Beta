const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comment");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Comment Routes
router.post("/createComment/:id", commentsController.createComment);
router.post("/editComment/:id", commentsController.editComment);

module.exports = router;