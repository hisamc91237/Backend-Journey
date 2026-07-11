const express = require("express");

const app = express();

module.exports = app;

app.use(express.json());

const notes = [];

/* GET /notes */
app.get("/notes", (req, res) => {
  res.status(200).json({
    notes: notes,
  });
});

/* POST / notes */
app.post("/notes", (req, res) => {
  notes.push(req.body);

  res.status(201).json({
    message: " Notes added successfully",
  });
});

/* DELETE /notes/:index */
app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];

  res.status(204).json({
    message: "Notes deleted successfully",
  });
});

/* PATCH /notes/:index */
app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;
  res.status(200).json({
    message: "Notes updated successfully",
  });
});
