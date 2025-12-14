const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const entriesRoutes = require('./routes/entries');

// a big chain of middleware, like a funnel which we send this express and every part can do something with the request.
const app = express();

mongoose.connect("mongodb+srv://kimah:ItdBfW8WqEhkM6SH@cluster0.huzsxja.mongodb.net/timeandspace?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connected to database!")
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/entries", entriesRoutes);

module.exports = app;
