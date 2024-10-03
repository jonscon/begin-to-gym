"use strict";
const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { NotFoundError } = require("../expressError");

/** Related functions for programs. */

class Program {
    /** Create a program (from data), update db, return new program data.
     * 
     * data should be { name, type, num_weeks, num_days, username }
     * 
     * Workouts will be routed to the program, storing in program_workouts:
     * - programId
     * - workoutIds
     * 
     * Returns { name, type, numWeeks, numDays, username }
     */
    
    static async create(data) {
        const preCheck = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`, [data.username]);
        const user = preCheck.rows[0];

        if (!user) throw new NotFoundError(`No username: ${data.username}`);

        const programResult = await db.query(
            `INSERT INTO programs (name,
                                   type,
                                   num_weeks,
                                   num_days,
                                   username)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING id, name, type, num_weeks AS "numWeeks", num_days AS "numDays", username`,
             [
                data.name,
                data.type,
                data.numWeeks,
                data.numDays,
                data.username,
             ]);

        let program = programResult.rows[0];

        /** Store workouts IDs that need to be connected to a program. */
        let workoutIds = [];
        
        // Add 2 beginner program workout ids: 1, 2
        if (program.type === '0') {
            workoutIds.push(1, 2);
        // Add 5 bodybuilding program workout ids: 3, 4, 5, 6, 7
        } else if (program.type === '2') {
            workoutIds.push(3, 4, 5, 6, 7);
        } else if (program.type === '1') {
            workoutIds.push(8, 9, 10);
            if (program.numDays === 6) {
                workoutIds.push(11, 12, 13);
            }
        }
        for (let i = 0; i < program.numDays; i++) {
            await db.query(
                `INSERT INTO program_workouts (program_id, workout_id)
                 VALUES ($1, $2)
                 RETURNING id, program_id AS "programId", workout_id AS "workoutId"`,
                 [program.id, workoutIds[i]]);
        }

        return program;
    }

    /** Find a specific program and its workouts.
     * 
     * Returns { id, name, numWeeks, workouts: [workout_name, ...] }
     */

    static async findProgram(id) {
        const programResult = await db.query(
            `SELECT p.id,
                    p.name AS program_name,
                    p.num_weeks,
                    p.num_days,
                    w.id AS workout_id,
                    w.name AS workout_name 
             FROM programs p 
             LEFT JOIN program_workouts x
              ON p.id = x.program_id 
             LEFT JOIN workouts w 
              ON x.workout_id = w.id
             WHERE p.id = $1`, [id]);

        if (!programResult.rows.length) {
            throw new NotFoundError(`No program: ${id}`);
        };

        let program = {
            id: programResult.rows[0].id,
            name: programResult.rows[0].program_name,
            numWeeks: programResult.rows[0].num_weeks,
            workouts: programResult.rows.map(w => (
                {
                    id: w.workout_id,
                    name: w.workout_name
                }
            ))
        };

        
        return program;
      }

    /** Delete program: updates db, returns undefined.
     * 
     * - username: username deleting program
     * - programId: program id getting deleted
     */

    static async deleteProgram(programId) {
        let result = await db.query(
              `DELETE
               FROM programs 
               WHERE id = $1
               RETURNING id, username`, 
              [programId]);

        if (!result.rows.length) throw new NotFoundError(`No program: ${programId}`)

        const program = result.rows[0];
  
      }
    
}

module.exports = Program;