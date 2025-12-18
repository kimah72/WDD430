const express = require("express");

const PostController = require("../controllers/entries")

const checkAuth = require("../middleware/check-auth");
const extractFile = require("../middleware/file")
const router = express.Router();

router.post("", checkAuth, extractFile, PostController.createEntry);

router.put("/:id", checkAuth, extractFile, PostController.updateEntry   );

router.get("", PostController.getEntries);

router.get("/:id", PostController.getEntry);

router.delete("/:id", checkAuth, PostController.deleteEntry);

module.exports = router;