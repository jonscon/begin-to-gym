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

/************************************** GET /workout/:id */

describe("GET /workout/:id", () => {
    test("ok for logged in user", async function () {
        const resp = await request(app)
            .get(`/workout/1`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body.workout.id).toEqual(1);
    });

    test("unauth for not logged in user", async function () {
        const resp = await request(app)
            .get(`/workout/1`)
        expect(resp.statusCode).toEqual(401);
    });
});