const express = require("express");

const app = express();

app.use(express.json());

const notes = [];

/* 
POST /notes
*/
app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body);
  console.log(notes);
  res.send("note created");
});

/* 
GET /notes
*/
app.get("/notes", (req, res) => {
  res.send(notes);
});

/* 
DELETE /notes:index
*/
app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];
  res.send("note deleted");
});

/*
PATCH /notes/:index
*/
app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;
  res.send("note updated");
});

module.exports = app;
