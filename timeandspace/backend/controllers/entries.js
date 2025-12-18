// backend/controllers/entries.js
const Entry = require("../models/entry");

exports.createEntry = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  let imagePath = null;
  if (req.file) {
    imagePath = url + "/images/" + req.file.filename;
  }

  const entry = new Entry({
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });

  entry.save()
    .then(createdEntry => {
      res.status(201).json({
        message: "Entry added successfully",
        entry: {
          id: createdEntry._id,
          ...createdEntry._doc
        }
      });
    })
    .catch(err => {
      res.status(500).json({ message: "Creating entry failed!" });
    });
};

exports.updateEntry = (req, res, next) => {
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + "://" + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }

  Entry.updateOne(
    { _id: req.params.id, creator: req.userData.userId },
    { title: req.body.title, content: req.body.content, imagePath: imagePath }
  )
    .then(result => {
      if (result.matchedCount > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Update failed!" });
    });
};

exports.getEntries = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const entryQuery = Entry.find();
  let fetchedEntries;

  if (pageSize && currentPage) {
    entryQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

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
    })
    .catch(err => {
      res.status(500).json({ message: "Fetching entries failed!" });
    });
};

exports.getEntry = (req, res, next) => {
  Entry.findById(req.params.id)
    .then(entry => {
      if (entry) {
        res.status(200).json(entry);
      } else {
        res.status(404).json({ message: "Entry not found!" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Fetching entry failed!" });
    });
};

exports.deleteEntry = (req, res, next) => {
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
};