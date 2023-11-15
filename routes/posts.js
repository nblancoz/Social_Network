const express = require("express");
const PostController = require("../controllers/PostController");
const { authentication, isAdmin } = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", authentication, PostController.create);
router.put("/updateById/:_id", authentication, PostController.update);
router.delete("/deleteById/:_id", authentication, isAdmin, PostController.delete);
router.get("/getByName/:name", authentication, PostController.getPostsByName);
router.get("/getById/:_id", PostController.getById);
router.get('/getAll', PostController.getAll);

module.exports = router;