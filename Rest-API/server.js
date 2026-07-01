const express = require("express");

const app = express();

app.use(express.json()); // Middleware - use to read data in req.body

const notes = [];

// PUT Method
app.post("/notes", (req, res) => {
  console.log(req.body);

  res.send("Notes created");
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log("Server is running....");
});
