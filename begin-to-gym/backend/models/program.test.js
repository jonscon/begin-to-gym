"use strict";

const db = require("../db.js");
const { BadRequestError, NotFoundError } = require("../expressError");
const Program = require("./program.js");
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

/************************************** create */

describe("create", function () {
  const newProgram = {
    name: 'new',
    type: '0',
    numWeeks: 4,
    numDays: 2,
    username: 'u1',
  };

  test("works", async function () {
    let program = await Program.create(newProgram);
    expect(program.id).toEqual(expect.any(Number));

    const result = await db.query(
          `SELECT name, type, num_weeks AS numWeeks, num_days AS numDays, username
           FROM programs`);
    expect(result.rows).toHaveLength(4);
  });
});

/************************************** findProgram */

describe("findProgram", function () {
  test("works", async function () {
    let program1 = await Program.findProgram(1);
    expect(program1.id).toEqual(expect.any(Number));
  });

  test("invalid program", async function () {
    try {
        let program = await Program.findProgram(100);
    } catch (err) {
        expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});


/************************************** deleteProgram */

describe("remove", function () {
  test("works", async function () {
    await Program.deleteProgram(1);
    const res = await db.query(
        "SELECT id FROM programs WHERE id = 1");
    expect(res.rows.length).toEqual(0);
  });

  test("not found if no such company", async function () {
    try {
        await Program.deleteProgram(1);
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
