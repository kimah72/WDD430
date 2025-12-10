const express = require('express');
const app = express();

// THIS LINE WAS MISSING — needed for POST body parsing
app.use(express.json());

// CORS fix
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// GET route — MUST be before the POST route
app.get("/api/entries", (req, res) => {
  const entries = [
    { id: "1", title: "First server-side entry", content: "This is coming from the server" },
    { id: "2", title: "Second server-side entry", content: "This is coming from the server!" }
  ];
  res.status(200).json({ message: "Success", entries });
});

// POST route
app.post("/api/entries", (req, res) => {
  const entry = req.body;
  console.log("New entry:", entry);
  res.status(201).json({ message: "Entry added successfully" });
});

app.listen(3000, () => console.log("Backend running on http://localhost:3000"));