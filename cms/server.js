const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const documents = require('./server/routes/documents');
const messages = require('./server/routes/messages');
const contacts = require('./server/routes/contacts');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});

// THIS IS THE ONLY LINE THAT MATTERS
app.use(express.static(path.join(__dirname, 'dist/cms/browser')));

// API Routes
app.use('/documents', documents);
app.use('/messages', messages);
app.use('/contacts', contacts);

// THIS MUST BE LAST
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist/cms/browser/index.html'));
});

// MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/cms', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB error:', err));

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});