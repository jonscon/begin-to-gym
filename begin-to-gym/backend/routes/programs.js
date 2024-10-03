"use strict";

/** Routes for programs. */

const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const Program = require("../models/program");

const router = new express.Router();

/** POST /program/create { program } => { program }
 * 
 * program should be { name, type, numWeeks, numDays, username }
 * 
 * Returns { id, name, type, numWeeks, numDays }
 * 
 * Authorization required: loggedIn
*/

router.post("/create", ensureLoggedIn, async function (req, res, next) {
    try {
        const program = await Program.create(req.body);
        return res.json({ program });
    } catch (err) {
        return next(err);
    }
})

/** GET /program/[id] => { programs: [programs] }
 * 
 * Returns { program: { id, name, numWeeks, workouts: [workout_name, ...] } }
 */

router.get("/:id", ensureLoggedIn, async function (req, res, next) {
    try {
      let programId = +req.params.id;
      const program = await Program.findProgram(programId);
      return res.json({ program });
    } catch (err) {
      return next(err);
    }
})

/** DELETE /program/[id] => { deleted: programId } 
 * 
 * Authorization required: same-user-as-:username
*/

router.delete("/:id", ensureLoggedIn, async function (req, res, next) {
  try {
    const programId = +req.params.id;
    await Program.deleteProgram(programId);
    return res.json({ deleted: programId });
  } catch (err) {
    return next(err);
  }
})


module.exports = router;

