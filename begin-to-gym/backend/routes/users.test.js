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
  testJobIds,
  u1Token,
  u2Token,
  adminToken,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /users/:username */

describe("GET /users/:username", function () {
    test("works for same user", async function () {
        const resp = await request(app)
            .get(`/users/u1`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
          user: {
            username: "u1",
            firstName: "U1F",
            lastName: "U1L",
            email: "user1@user.com",
          },
        });
    });

    test("unauth for other users", async function () {
        const resp = await request(app)
            .get(`/users/u1`)
            .set("authorization", `Bearer ${u2Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("unauth for anon", async function () {
        const resp = await request(app)
            .get(`/users/u1`);
        expect(resp.statusCode).toEqual(401);
    });

    test("not found if user not found", async function () {
        const resp = await request(app)
            .get(`/users/nope`)
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.statusCode).toEqual(401);
    });
});

/************************************** PATCH /users/:username */

describe("PATCH /users/:username", () => {

    test("works for same user", async function () {
        const resp = await request(app)
            .patch(`/users/u1`)
            .send({
                firstName: "New",
            })
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body).toEqual({
            user: {
            username: "u1",
            firstName: "New",
            lastName: "U1L",
            email: "user1@user.com",
            },
        });
    });

    test("unauth if not same user", async function () {
        const resp = await request(app)
            .patch(`/users/u1`)
            .send({
                firstName: "New",
            })
            .set("authorization", `Bearer ${u2Token}`);
        expect(resp.statusCode).toEqual(401);
    });

    test("unauth for anon", async function () {
        const resp = await request(app)
            .patch(`/users/u1`)
            .send({
                firstName: "New",
            });
        expect(resp.statusCode).toEqual(401);
    });

    test("not found if no such user", async function () {
        const resp = await request(app)
            .patch(`/users/nope`)
            .send({
                firstName: "Nope",
            })
            .set("authorization", `Bearer ${adminToken}`);
        expect(resp.statusCode).toEqual(401);
    });
})

/************************************** GET /users/:username/programs */

describe("GET /users/:username/programs", () => {
    test("works for user", async function () {
        const resp = await request(app)
            .get('/users/u1/programs')
            .set("authorization", `Bearer ${u1Token}`);
        expect(resp.body.programs).not.toHaveLength(0);
    })
});