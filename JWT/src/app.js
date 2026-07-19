const express = require("express");
const authRouter = require("../routes/auth.route");
const cookieParser = require("cookie-parser");

const app = express();
app.use(cookieParser()); // Midcleware to use Cookie Storage

app.use(express.json()); // Middleware

app.use("/api/auth", authRouter);

module.exports = app;
