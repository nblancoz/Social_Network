const express = require("express");
const CommentController = require("../controllers/CommentController");
const { isAdmin, authentication, isAuthor } = require("../middlewares/authentication");
const router = express.Router();

router.post("/create/:postId", authentication, CommentController.create);
router.get("/getAll", CommentController.getAll);
router.delete("/deleteById/:_id", authentication, isAdmin, CommentController.delete);
router.put("/updateById/:_id", authentication, CommentController.update)

module.exports = router;
