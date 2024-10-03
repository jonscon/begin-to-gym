"use strict";

/** Routes for workouts. */

const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const Workout = require("../models/workout");

const router = new express.Router();

/** GET /workout/[id] => { workouts: [workouts] }
 * 
 * Returns { workout: { id, name, exercises: [exercise_name, ...] } }
 */

router.get("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
      let workoutId = +req.params.id;
      const workout = await Workout.findWorkout(workoutId);
      return res.json({ workout });
    } catch (err) {
      return next(err);
    }
})


module.exports = router;