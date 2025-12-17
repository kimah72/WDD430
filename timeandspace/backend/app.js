const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const entriesRoutes = require('./routes/entries');
const userRoutes = require('./routes/user');

// added mongoose connection in server.js instead of app.js

// a big chain of middleware, like a funnel which we send express and every part can do something with the request.
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

// CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/entries", entriesRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
