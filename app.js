require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRouter = require("./src/routes/userRoutes");
const photosRouter = require("./src/routes/photosRoutes");
const commentsRouter = require("./src/routes/commentsRoutes");

const { DB_URL, DB_PORT, PORT, DB_NAME } = process.env;

mongoose.connect(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`);

// Start express app
const app = express();

// bodyParser Middleware
app.use(express.json());
// cookieParser Middleware
app.use(cookieParser());

// cors Config:
const corsConfig = {
  origin: "http://localhost:3007",
  credentials: true,
};

// cors Middleware:
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

// ROUTERS
app.use("/user", userRouter);
app.use("/photos", photosRouter);
app.use("/comments", commentsRouter);

// drop-database:
app.post("/drop-database", async (req, res) => {
  await mongoose.connection.db.dropDatabase();
  res.status(200).send("OK! database dropt ");
});

// NotFound Handler (Route Not Found 404)/middleware:
app.use((req, res, next) => {
  const error = new Error("Route Not Found!!");
  error.status = 404;
  next(error);
});

// Error Handler/middleware:
// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: error.messagge,
  });
});

//  Start running Server
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
