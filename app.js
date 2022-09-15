require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./src/routes/userRoutes");
const photosRouter = require("./src/routes/photosRoutes");
const commentsRouter = require("./src/routes/commentsRoutes");

const { DB_URL, DB_PORT, PORT, DB_NAME } = process.env;

mongoose.connect(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`);

// Start express app
const app = express();

// bodyParser Middleware
app.use(express.json());

// ROUTERS
app.use("user", userRouter);
app.use("photos", photosRouter);
app.use("comments", commentsRouter);

// NotFound Handler (Route Not Found 404)/middleware:

app.use((req, res, next) => {
  const error = new Error("Route Not Found!!");
  error.status = 404;
  next(error);
});

// Error Handler/middleware

//  Start running Server
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
