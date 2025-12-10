const express = require('express');
// a big chain of middleware, like a funnel which we send this express and every part can do something with the request.
const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, entry, PATCH, DELETE, OPTIONS"
  );
  next();
});

// middleware
// app.use((req, res, next) => {
//     console.log('First middleware');
//     next();
// });

// this is where we are sending the request - we will see json data
app.use("/api/entries", (req, res, next) => {
    const entry = req.body;
  console.log(entry);
  res.status(201).json({
    message: 'entry added successfully'
  });
});

app.get("/api/entries", (req, res, next) => {
  const entries = [
    {
      id: "fadf12421l",
      title: "First server-side entry",
      content: "This is coming from the server"
    },
    {
      id: "ksajflaj132",
      title: "Second server-side entry",
      content: "This is coming from the server!"
    }
  ];
  res.status(200).json({
    message: "Entries fetched successfully!",
    entries: entries
  });
});

module.exports = app;
