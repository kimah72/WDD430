const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

router.get('/', (req, res) => {
  Contact.find()
    .populate('group')
    .then(contacts => {
      res.status(200).json(contacts);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error fetching contacts', error: err });
    });
});

router.post('/', (req, res) => {
  const maxId = sequenceGenerator.nextId("contacts");

  const contact = new Contact({
    id: maxId.toString(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group || []
  });

  contact.save()
    .then(created => {
      Contact.populate(created, { path: 'group' })
        .then(populated => res.status(201).json(populated));
    })
    .catch(err => res.status(500).json({ error: err }));
});

router.put('/:id', (req, res) => {
  Contact.findOne({ id: req.params.id })
    .then(contact => {
      contact.name = req.body.name;
      contact.email = req.body.email;
      contact.phone = req.body.phone;
      contact.imageUrl = req.body.imageUrl;
      contact.group = req.body.group || [];

      Contact.updateOne({ id: req.params.id }, contact)
        .then(() => res.status(204).json())
        .catch(err => res.status(500).json(err));
    })
    .catch(() => res.status(404).json({ message: 'Contact not found' }));
});

router.delete('/:id', (req, res) => {
  Contact.deleteOne({ id: req.params.id })
    .then(() => res.status(204).json())
    .catch(err => res.status(500).json(err));
});

module.exports = router;