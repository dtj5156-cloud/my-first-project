const express = require("express");
const app = express();

// Logger for server proof
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`${req.method} ${req.url} -> ${res.statusCode}`);
  });
  next();
});

app.use(express.json());

// In-memory storage
let items = [];

// POST - create item
app.post("/items", (req, res) => {
  const item = req.body;
  items.push(item);
  res.status(201).json(item);
});

// GET - retrieve items
app.get("/items", (req, res) => {
  res.status(200).json(items);
});

// Health endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

module.exports = app;