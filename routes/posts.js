const express = require("express");
const PostController = require("../controllers/PostController");
const { authentication, isAdmin, isAuthor } = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", authentication, PostController.create);
router.put("/updateById/:_id", authentication, isAuthor, PostController.update);
router.delete("/deleteById/:_id", authentication, isAdmin, PostController.delete);
router.get("/getByName/:name", PostController.getPostsByName);
router.get("/getById/:_id", PostController.getById);
router.get('/getAll', PostController.getAll);
// router.get('/getAllWithComments', PostController.getAllWithComments);
router.post('/comment/:_id', PostController.insertComment);
module.exports = router;