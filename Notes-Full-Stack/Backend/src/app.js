const express = require("express");
const app = express();
const noteModel = require("./models/note.model");
const cors = require("cors");
const path = require("path");

app.use(express.json()); // Middleware
app.use(cors()); // Middleware for cors
app.use(express.static("./public")); // Middleware to allow public folder files api calls

// POST /api/notes
app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "note created successfully",
    note,
  });
});

// GET /api/notes
app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "note fetched",
    notes,
  });
});

//DELTE /api/notes/:id
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "note deleted successfully",
  });
});

// UPDATE /api/notes/:id
app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { title } = req.body;

  const note = await noteModel.findByIdAndUpdate(id, { title });

  res.status(200).json({
    message: "note updated successfully",
    note,
  });
});

// Middleware - * is wild card
app.use("*", (req, res) => {
  res.sendFile(path.join("__dirname", "..", "/public/index.html"));
});

module.exports = app;
