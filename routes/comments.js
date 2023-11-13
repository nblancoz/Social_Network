const express = require("express");
const CommentController = require("../controllers/CommentController");
const router = express.Router();

router.post("/create", CommentController.create);

module.exports = router;