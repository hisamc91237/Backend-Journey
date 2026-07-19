const express = require("express");
const userModel = require("../models/user.model");

const authRouter = express.Router();

// POST /api/auth/register
authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const user = await userModel.create({
    email,
    name,
    password,
  });
  res.status(201).json({
    message: "user registered",
    user,
  });
});

module.exports = authRouter;
