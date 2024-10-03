"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Exercise = require("./exercise.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  programIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** findExercise */

describe("findExercise", function () {
    test("works", async function () {
      let exercise = await Exercise.findExercise("Deadlifts");
      expect(exercise.name).toEqual("Deadlifts");
    });

    test("invalid exercise", async function () {
        try {
            let exercise = await Exercise.findExercise("Deadlifts");
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});