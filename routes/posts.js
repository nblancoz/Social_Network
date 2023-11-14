const express = require("express");
const PostController = require("../controllers/PostController");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();

router.post("/", authentication, PostController.create);
router.put("/id/:_id", PostController.update);

module.exports = router;