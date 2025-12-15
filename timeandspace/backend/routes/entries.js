const express = require("express");
const multer = require("multer");

const Entry = require("../models/entry");

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

router.post("", multer({storage: storage}).single("image"), (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  let imagePath = null;
  if (req.file) {
    imagePath = url + "/images/" + req.file.filename;
  }

  const entry = new Entry({
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath   // ← null if no image
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

router.put("/:id", multer({ storage: storage }).single("image"), (req, res, next) => {
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

  Entry.updateOne({ _id: req.params.id }, updatedEntry)
    .then(result => {
      console.log(result);
      res.status(200).json({ message: "Update successful!" });
    })
    .catch(err => {
      console.error("Update failed:", err);
      res.status(500).json({ message: "Update failed!" });
    });
});

router.get("", (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} /api/entries requested`);
  Entry.find().then(documents => {
    res.status(200).json({
    message: "Entries fetched successfully!",
    entries: documents
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

router.delete("/:id", (req, res, next) => {
  Entry.deleteOne ({_id: req.params.id}).then(result => {
    console.log(result);
  res.status(200).json({ message: "Entry deleted!" });
  });
});

module.exports = router;