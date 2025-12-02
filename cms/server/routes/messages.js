const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');

router.get('/', (req, res) => {
  Message.find()
    .populate('sender')
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error fetching messages', error: err });
    });
});

router.post('/', (req, res) => {
  const maxId = sequenceGenerator.nextId("messages");

  const message = new Message({
    id: maxId.toString(),
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });

  message.save()
    .then(created => {
      Message.populate(created, { path: 'sender' })
        .then(populated => res.status(201).json(populated));
    })
    .catch(err => res.status(500).json({ error: err }));
});

router.put('/:id', (req, res) => {
  Message.findOne({ id: req.params.id })
    .then(msg => {
      msg.subject = req.body.subject;
      msg.msgText = req.body.msgText;
      msg.sender = req.body.sender;

      Message.updateOne({ id: req.params.id }, msg)
        .then(() => res.status(204).json())
        .catch(err => res.status(500).json(err));
    })
    .catch(() => res.status(404).json({ message: 'Message not found' }));
});

router.delete('/:id', (req, res) => {
  Message.deleteOne({ id: req.params.id })
    .then(() => res.status(204).json())
    .catch(err => res.status(500).json(err));
});

module.exports = router;