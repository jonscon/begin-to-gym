"use strict";
// create login, signup, and logout routes
/** Express app for begin to gym. */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const exerciseRoutes = require("./routes/exercises");
const programRoutes = require("./routes/programs");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/users")

const app = express();
const { NotFoundError } = require("./expressError");

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/exercise", exerciseRoutes);
app.use("/program", programRoutes);
app.use("/workout", workoutRoutes);
app.use("/users", userRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
  });
  
/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;
  
    return res.status(status).json({
      error: { message, status },
    });
});

module.exports = app;