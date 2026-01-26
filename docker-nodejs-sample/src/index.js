const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello Docker Node.js!" });
});

// ✅ Add health endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`App running on port ${port}`);
  });
}