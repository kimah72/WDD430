const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  msgText: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: false }
});

module.exports = mongoose.model('Message', messageSchema);