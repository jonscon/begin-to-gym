"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  u3Token,
  testProgramIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /exercise/:name */

describe("GET /exercise/:name", () => {
    test("ok for logged in user", async function () {
        const resp = await request(app)
            .get(`/exercise/Deadlifts`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body.exercise.name).toEqual("Deadlifts");
    });

    test("unauth for not logged in user", async function () {
        const resp = await request(app)
            .get(`/exercise/Deadlifts`)
        expect(resp.statusCode).toEqual(401);
    });
});