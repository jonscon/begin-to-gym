\echo 'Delete and recreate gym db?'
\prompt 'Return for yes or control-C to cancel > ' foo

\connect postgres

DROP DATABASE gym;
CREATE DATABASE gym;
\connect gym

\echo 'Loading schema into gym...'
\i gym-schema.sql
\echo 'Seeding data into gym...'
\i gym-seed.sql

\echo 'Delete and recreate gym_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

\connect postgres

DROP DATABASE gym_test;
CREATE DATABASE gym_test;
\connect gym_test

\i gym-schema.sql
\i gym-seed.sql