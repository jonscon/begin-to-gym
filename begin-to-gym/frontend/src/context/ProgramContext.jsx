import { createContext, useState  } from "react";
import GymApi from "../api";

/** Context for Program View.
 * 
 * This will contain the API calls needed to pull data for the Program,
 * Workout, and Exercises.
 * 
 * Used in ProgramList, ProgramDetails, WorkoutDetails, and ExerciseDetails.
 */

const ProgramContext = createContext();

export function ProgramProvider({ children }) {
    const [programDetails, setProgramDetails] = useState(null);
    const [workoutDetails, setWorkoutDetails] = useState(null);
    const [exerciseDetails, setExerciseDetails] = useState(null);

    return (
        <ProgramContext.Provider value={{ programDetails, setProgramDetails, workoutDetails, setWorkoutDetails, exerciseDetails, setExerciseDetails }}>
            {children}
        </ProgramContext.Provider>
    )
}

export default ProgramContext;