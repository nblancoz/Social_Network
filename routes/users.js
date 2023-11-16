const express = require("express");
const UserController = require("../controllers/UserController");
const { authentication, isAdmin, isAuthor } = require("../middlewares/authentication");
const router = express.Router();

router.post("/create", UserController.create);
router.post("/login", UserController.login);
router.post("/logout/:_id", authentication, UserController.logout);
router.get("/getAll", UserController.getAll)
router.delete("/deleteById/:_id", authentication, isAdmin, UserController.delete);
router.get("/getInfo", authentication, UserController.getInfo)
router.put("/follow/:_id", authentication, UserController.follow)

module.exports = router;