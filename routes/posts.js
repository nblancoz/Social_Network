const express = require("express");
const PostController = require("../controllers/PostController");
const { authentication } = require("../middlewares/authentication");
const router = express.Router();

router.post("/", authentication, PostController.create);
router.put("/id/:_id", authentication, PostController.update);
router.delete("/id/:_id", authentication, PostController.delete);
router.get("/name/:name", authentication, PostController.getPostsByName);
router.get("/id/:_id", PostController.getById);
router.get('/posts', PostController.getAll);
module.exports = router;