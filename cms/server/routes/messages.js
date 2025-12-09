const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Message = require('../models/message');
const Contact = require('../models/contact');

router.get('/', (req, res) => {
  Message.find()
    .populate('sender')
    .then(messages => res.status(200).json({ messages }))  // ← { messages: ... }
    .catch(err => res.status(500).json({ error: err }));
});

router.post('/', async (req, res) => {
  try {
    const maxMessageId = sequenceGenerator.nextId("messages");

    let senderId = req.body.sender;

    // Convert name to real ObjectId
    if (senderId && typeof senderId === 'string' && isNaN(senderId)) {
      const contact = await Contact.findOne({ name: senderId });
      senderId = contact ? contact._id : null;
    }

    const message = new Message({
      id: maxMessageId.toString(),
      subject: req.body.subject,
      msgText: req.body.msgText,
      sender: senderId
    });

    const created = await message.save();
    const populated = await Message.populate(created, { path: 'sender' });
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;