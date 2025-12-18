const express = require("express");

const UserController = require("../controllers/user")

const router = express.Router();

// clean routes file. Logic has been taken to the controller

router.post("/signup", UserController.createUser);

router.post("/login", UserController.userLogin);

module.exports = router;