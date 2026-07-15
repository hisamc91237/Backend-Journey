const express = require("express");
const noteModel = require("./models/note.model");

const app = express();
app.use(express.json());

module.exports = app;

/* 
POST /notes
*/
app.post("/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created",
    note,
  });
});
