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

/************************************** POST /program/create */

describe("POST /program/create", () => {
    test("ok for logged in user", async function () {
        const resp = await request(app)
            .post(`/program/create`)
            .send({
                name: 'test',
                type: '0',
                numWeeks: 4,
                numDays: 2,
                username: 'u1',
            })
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body.program.id).toEqual(expect.any(Number));
    });

    test("unauth for not logged in user", async function () {
        const resp = await request(app)
            .post(`/program/create`)
            .send({
                name: 'test',
                type: '0',
                numWeeks: 4,
                numDays: 2,
                username: 'u1',
            })
        expect(resp.statusCode).toEqual(401);
    });
});

/************************************** GET /program/:id */

describe("GET /program/:id", () => {
    test("ok for logged in user", async function () {
        const resp = await request(app)
            .get(`/program/${testProgramIds[0]}`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body.program.id).toEqual(expect.any(Number));
    });

    test("unauth for not logged in user", async function () {
        const resp = await request(app)
            .get(`/program/${testProgramIds[0]}`)
        expect(resp.statusCode).toEqual(401);
    });
})

/************************************** DELETE /program/:id */

describe("GET /program/:id", () => {
    test("ok for logged in user", async function () {
        const resp = await request(app)
            .delete(`/program/${testProgramIds[0]}`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({ deleted : testProgramIds[0] });
    });

    test("unauth for not logged in user", async function () {
        const resp = await request(app)
            .delete(`/program/${testProgramIds[0]}`)
        expect(resp.statusCode).toEqual(401);
    });
})
