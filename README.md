# Begin to Gym

### Begin to Gym is an application designed to help beginners start their fitness journey and busy individuals who want to prioritize fitness.

<!-- [Try out Begin to Gym here!]() -->

## Setup and Dependencies
To run the project locally on your computer, please see the following steps.

1. Clone the repository to your computer by typing `git clone git@github.com:hatchways-community/capstone-project-two-721ad6aa92164902af112e9759eccac2.git`.

2. Navigate to the project folder `begin-to-gym`.

```
cd begin-to-gym
```

3.  Then, open another Terminal tab so that you install dependencies from the frontend and backend.
```
cd frontend
npm install
```

```
cd backend
npm install
```

4. Create the database for this project: gym.

```
createdb gym
```

5. In the backend, you will need to run the `gym.sql` file, which will seed data for the application by running the below command.
```
psql -U [username] -d gym -a -f gym.sql
```

6. Run both the frontend and backend to get the app started.

For the frontend:
```
npm run dev
```

For the backend:
```
nodemon server.js
```

7. Congratulations, you can now use the app locally! Paste the local host URL from the frontend tab into your browser to start the application.

## Features
The main feature of this application is creating a custom workout program based on your needs. The three different programs you can create are Beginner, Strength-Building, or Bodybuilding programs.

These programs are created, with different workouts and exercises populated for the user to view and reference to when they work out.

Whether you are a beginner or a long time gym-goer, if you're unsure how to perform a specific exercise, you can click on an exercise to see the description and muscles worked.

## User Flow
The user will be prompted to create an account first or log in if they already have an existing account. From there, the user will be prompted to create a program.

![alt text](/readme-images/homepage.png)

### Program Creation
You can choose your goal, as well as the number of weeks, and lastly, the number of days you would like your program to be.
![alt text](/readme-images/create_program.png)

From there, you can view your programs in more detail.

### Programs, Workouts, and Exercises
You can see all the programs you've created in the "My Programs" tab and delete any that you do not want.
![alt text](/readme-images/program_list.png)

As mentioned in the features above, you can view the specific program details and what the workouts are for the week.
![alt text](/readme-images/program_details.png)

You can then navigate further to see what exercises are in the workout, as well as recommended set and rep ranges.
![alt text](/readme-images/workout.png)

If you are confused about or need a referesher on a specific exercise, you can click on it to view the details of it.
![alt text](/readme-images/exercise.png)

### Profile
Here, you can view your profile and change any details if desired.
![alt text](/readme-images/profile.png)

## Custom API
This API was built by myself, using data that is prepopulated into the database.

## Roadblocks
Initially, I wanted to use the Wger API, a website that had a wide range of exercises and details. However, as I built out the application, I realized that it didn't make sense to keep pulling from the API if I already had exercises and workouts in mind that I wanted to build. After making the decision to prepopulate data, the development process of the application smoothed out.

## Technologies Used
- HTML5/CSS3
- JavaScript
- Node.js
- Express
- React.js
- Bootstrap