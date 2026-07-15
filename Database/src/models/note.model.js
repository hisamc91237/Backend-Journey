const mongoose = require("mongoose");

// Define Schema

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
});

// Models for CRUD
const noteModel = mongoose.model("notes", noteSchema);

module.exports = noteModel;
