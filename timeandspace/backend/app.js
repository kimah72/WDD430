const express = require('express');
const bodyParser = require('body-parser');
// a big chain of middleware, like a funnel which we send this express and every part can do something with the request.
const app = express();

app.use(bodyParser.json());

// CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/entries", express.json(), (req, res, next) => {
    const entry = req.body;
    console.log(entry);
    res.status(201).json({
        message: 'entry added successfully'
    });
});

app.get("/api/entries", (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} /api/entries requested`);
  const entries = [
    {
      id: "fadf12421l",
      title: "First server-side entry",
      content: "This is coming from the server"
    },
    {
      id: "ksajflaj132",
      title: "Second server-side entry",
      content: "This is also coming from the server!"
    }
  ];

  console.log("Sending entries:", entries);

  res.status(200).json({
    message: "Entries fetched successfully!",
    entries: entries
  });
});

module.exports = app;
