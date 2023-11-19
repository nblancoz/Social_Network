const express = require("express");
const CommentController = require("../controllers/CommentController");
const { isAdmin, authentication, isAuthor } = require("../middlewares/authentication");
const router = express.Router();

router.post("/create/:postId", authentication, CommentController.create);
router.get("/getAll", CommentController.getAll);
router.delete("/deleteById/:_id", authentication, isAdmin, CommentController.delete);
router.put("/updateById/:_id", authentication, CommentController.update)
router.put('/likes/:_id', authentication, CommentController.like);
router.put('/unlike/:_id', authentication, CommentController.unlike);

module.exports = router;
