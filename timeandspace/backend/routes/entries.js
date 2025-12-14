const express = require("express");

const router = express.Router();

const Entry = require('../models/entry');

router.post("", express.json(), (req, res, next) => {
    const entry = new Entry({
        title: req.body.title,
        content: req.body.content
    });
    entry.save().then(result => {
        res.status(201).json({
        message: 'Entry added successfully',
        entryId: result._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  const entry = new Entry({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });
  Entry.updateOne({_id: req.params.id}, {title: req.body.title, content: req.body.content}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
})

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