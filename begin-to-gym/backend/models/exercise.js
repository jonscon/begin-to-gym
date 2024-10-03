"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { NotFoundError } = require("../expressError");

/** Related functions for exercises. */

class Exercise {
    /** Find a specific exercise and its details.
     * 
     * Returns { name, description, muscles_primary, muscles_secondary }
     */

    static async findExercise(name) {
        const exerciseResult = await db.query(
            `SELECT name,
                    description,
                    muscles_primary,
                    muscles_secondary
             FROM exercises 
             WHERE name = $1`, [name]);

        let exercise = exerciseResult.rows[0];

        if (!exercise) throw new NotFoundError(`No exercise: ${name}`);
        
        return exercise;
      }
}

module.exports = Exercise;