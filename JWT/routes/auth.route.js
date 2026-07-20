const express = require("express");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();

// POST /api/auth/register
authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({ email });

  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "user already exists with this email",
    });
  }

  const user = await userModel.create({
    email,
    name,
    password,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "user registered",
    user,
    token,
  });
});

// POST
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const isUserExist = await userModel.findOne({ email });

  if (!isUserExist) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isPasswordMatched = isUserExist.password === password;

  if (!isPasswordMatched) {
    return res.status(401).json({
      message: "Password is invalid",
    });
  }

  const token = jwt.sign(
    {
      id: isUserExist._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User logged in Successfully",
    isUserExist,
    token,
  });
});

module.exports = authRouter;
