require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const { DB_URL, DB_PORT, PORT, DB_NAME } = process.env;

mongoose.connect(`mongodb://${DB_URL}:${DB_PORT}/${DB_NAME}`);

// Start express app
const app = express();

// bodyParser Middleware
app.use(express.json());

// ROUTERS

// NotFound Handler (Route Not Found 404)/middleware

// Error Handler/middleware

//  Start running Server
app.listen(PORT);
