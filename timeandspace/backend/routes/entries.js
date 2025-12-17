const express = require("express");
const multer = require("multer");

const Entry = require("../models/entry");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + ext);
  }
});

router.post(
  "", 
  checkAuth,
  multer({storage: storage}).single("image"), 
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    let imagePath = null;
    if (req.file) {
      imagePath = url + "/images/" + req.file.filename;
    }
    const entry = new Entry({
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath,
      creator: req.userData.userId   // ← important for new entries
    });
    entry.save().then(createdEntry => {
      res.status(201).json({
        message: 'Entry added successfully',
        entry: {
          ...createdEntry._doc,
          id: createdEntry._id
        }
      });
    }).catch(err => {
      console.error("Create failed:", err);
      res.status(500).json({ message: "Creating entry failed!" });
    });
});

router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"), 
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }

    const updatedEntry = {
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath
    };

    // Only allow update if user is creator
    Entry.updateOne({ _id: req.params.id, creator: req.userData.userId }, updatedEntry)
      .then(result => {
        if (result.matchedCount > 0) {
          res.status(200).json({ message: "Update successful!" });
        } else {
          res.status(401).json({ message: "Not authorized!" });
        }
      })
      .catch(err => {
        console.error("Update failed:", err);
        res.status(500).json({ message: "Update failed!" });
      });
});

module.exports = router;

router.get("", (req, res, next) => {
    // pagination parameters
    const pageSize= +req.query.pagesize;
    const currentPage = +req.query.page;
    const entryQuery = Entry.find();
    let fetchedEntries;
    if (pageSize && currentPage) {
        entryQuery
        .skip(pageSize * (currentPage - 1))
        .limit(pageSize);
    }
    console.log(`[${new Date().toISOString()}] ${req.method} /api/entries requested`);
    entryQuery
    .then(documents => {
        fetchedEntries = documents;
        return Entry.countDocuments();
    })
    .then(count => {
        res.status(200).json({
            message: "Entries fetched successfully!",
            entries: fetchedEntries,
            maxEntries: count
        });
    });
});

router.get("/:id", (req, res, next) => {
  Entry.findById(req.params.id).then(entry => {
    if (entry) {
      res.status(200).json(entry);
    } else {
      res.status(404).json({ message: "Entry not found!" });
    }
  });
});


router.delete("/:id", checkAuth, (req, res, next) => {
  Entry.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Delete failed!" });
    });
});

module.exports = router;