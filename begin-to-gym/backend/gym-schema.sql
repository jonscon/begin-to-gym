CREATE TABLE users (
    username VARCHAR(25) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL
        CHECK (position('@' IN email) > 1)
);

CREATE TABLE programs (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    num_weeks INTEGER NOT NULL,
    num_days INTEGER NOT NULL,
    username VARCHAR(25) NOT NULL
        REFERENCES users ON DELETE CASCADE
);

CREATE TABLE workouts (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE program_workouts (
    id SERIAL PRIMARY KEY,
    program_id INTEGER 
        REFERENCES programs ON DELETE CASCADE,
    workout_id INTEGER 
        REFERENCES workouts ON DELETE CASCADE
);

CREATE TABLE exercises (
    name VARCHAR(50) PRIMARY KEY,
    description TEXT NOT NULL,
    sets INTEGER NOT NULL,
    reps TEXT NOT NULL,
    muscles_primary TEXT NOT NULL,
    muscles_secondary TEXT
);

CREATE TABLE workout_exercises (
    id SERIAL PRIMARY KEY,
    workout_id INTEGER
        REFERENCES workouts ON DELETE CASCADE,
    exercise_name VARCHAR(50)
        REFERENCES exercises ON DELETE CASCADE
);