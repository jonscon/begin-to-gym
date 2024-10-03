"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { NotFoundError } = require("../expressError");

/** Related functions for workouts. */

class Workout {
    /** Find a specific workout and its exercises.
     * 
     * Returns { id, name, exercises: [exercise_name, ...] }
     */

    static async findWorkout(id) {
        const workoutResult = await db.query(
            `SELECT w.id, 
                    w.name AS workout_name,
                    x.exercise_name,
                    e.sets,
                    e.reps
             FROM workouts w 
             LEFT JOIN workout_exercises x 
              ON w.id = x.workout_id
             LEFT JOIN exercises e
              ON x.exercise_name = e.name 
             WHERE w.id = $1`, [id]);

        if (!workoutResult.rows.length) throw new NotFoundError(`No workout: ${id}`);

        let workout = {
            id: workoutResult.rows[0].id,
            name: workoutResult.rows[0].workout_name,
            exercises: workoutResult.rows.map(e => (
                {
                    exerciseName: e.exercise_name,
                    sets: e.sets,
                    reps: e.reps
                }
            ))
        };

        
        return workout;
      }
}

module.exports = Workout;