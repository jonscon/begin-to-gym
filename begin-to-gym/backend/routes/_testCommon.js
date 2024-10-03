"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Program = require("../models/program");
const { createToken } = require("../helpers/tokens");

const testProgramIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM programs");

  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
  });

  let p1 = await Program.create({
        name: 'new1',
        type: '0',
        numWeeks: 4,
        numDays: 2,
        username: 'u1',
  });
  let p2 = await Program.create(
      {
        name: 'new2',
        type: '1',
        numWeeks: 4,
        numDays: 3,
        username: 'u2',
      });
  let p3 = await Program.create(
      {
        name: 'new3',
        type: '2',
        numWeeks: 4,
        numDays: 5,
        username: 'u3',
      });

  testProgramIds.push(p1.id, p2.id, p3.id);
  console.log(testProgramIds);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


const u1Token = createToken({ username: "u1" });
const u2Token = createToken({ username: "u2" });
const u3Token = createToken({ username: "u3" });


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
  u3Token,
  testProgramIds,
};
