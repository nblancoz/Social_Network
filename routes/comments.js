const express = require("express");
const CommentController = require("../controllers/CommentController");
const { isAdmin, authentication } = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", CommentController.create);
router.get("/getAll", CommentController.getAll);
router.delete("/deleteById/:_id", authentication, isAdmin, CommentController.delete);

module.exports = router;
