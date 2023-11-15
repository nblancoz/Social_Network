const express = require("express");
const UserController = require("../controllers/UserController");
const { authentication, isAdmin } = require("../middlewares/authentication");
const router = express.Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/logout/:_id", authentication, UserController.logout);
router.get("/getAll", UserController.getAll)
router.delete("/deleteById/:_id",authentication, isAdmin, UserController.delete);

module.exports = router;