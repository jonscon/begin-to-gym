"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Workout = require("./workout.js");
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

/************************************** findWorkout */

describe("findWorkout", function () {
    test("works", async function () {
      let workout = await Workout.findWorkout(1);
      expect(workout.name).toEqual("Full Body 1");
    });

    test("invalid exercise", async function () {
        try {
            let workout = await Workout.findWorkout(1);
        } catch (err) {
            expect(err instanceof NotFoundError).toBeTruthy();
        }
    });
});