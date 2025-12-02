var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

var Document = require('../models/document');

router.get('/', (req, res) => {
  Document.find()
    .populate('children')
    .then(documents => {
      res.status(200).json(documents);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error fetching documents', error: err });
    });
});

router.post('/', (req, res) => {
  const maxId = sequenceGenerator.nextId("documents");
  const document = new Document({
    id: maxId.toString(),
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  document.save()
    .then(created => {
      res.status(201).json(created);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error saving document', error: err });
    });
});

router.put('/:id', (req, res) => {
  Document.findOne({ id: req.params.id })
    .then(doc => {
      doc.name = req.body.name;
      doc.description = req.body.description;
      doc.url = req.body.url;

      Document.updateOne({ id: req.params.id }, doc)
        .then(() => res.status(204).json())
        .catch(err => res.status(500).json(err));
    })
    .catch(err => res.status(404).json({ message: 'Document not found' }));
});

router.delete('/:id', (req, res) => {
  Document.deleteOne({ id: req.params.id })
    .then(() => res.status(204).json())
    .catch(err => res.status(500).json(err));
});

module.exports = router;