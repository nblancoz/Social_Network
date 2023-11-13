const express = require("express");
const UserController = require("../controllers/UserController");
const router = express.Router();

router.post("/register", UserController.register)
router.delete("/delete/:_id", UserController.delete)

module.exports = router;