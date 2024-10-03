"use strict";

/** Routes for exercises. */

const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const Exercise = require("../models/exercise");

const router = new express.Router();

/** GET /exercise/[id] => { exercise }
 * 
 * Returns { exercise: { name, description, muscles_primary, muscles_secondary } }
 */

router.get("/:name", ensureLoggedIn, async function (req, res, next) {
    try {
      const exercise = await Exercise.findExercise(req.params.name);
      return res.json({ exercise });
    } catch (err) {
      return next(err);
    }
})

module.exports = router;