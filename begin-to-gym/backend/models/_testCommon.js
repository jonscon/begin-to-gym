const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const programIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM programs");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  await db.query(`
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
      [
        await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
        await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
      ]);

  const programRes = await db.query(`
    INSERT INTO programs (id, name, type, num_weeks, num_days, username)
    VALUES (1, 'p1', '0', 4, 2, 'u1'),
           (2, 'p2', '1', 8, 3, 'u1'),
           (3, 'p3', '2', 12, 5, 'u2')
    RETURNING id`);

  const programIds = programRes.rows.map(p => p.id);
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

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  programIds,
}