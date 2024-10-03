import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useProgramContext from "../hooks/useProgramContext.js";
import GymApi from "../api";
import LoadingSpinner from "../general/LoadingSpinner";
import "./WorkoutDetails.css";

/** Show the workouts and exercises in a program.
 * 
 * On mount, loads program from API.
 * 
 * Routed to at /workout/:id
 */

function WorkoutDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { workoutDetails, setWorkoutDetails, programDetails } = useProgramContext();

    /** Retrieve workout on load. */
    useEffect(() => {
        async function getWorkout() {
            let workout = await GymApi.getWorkout(id);
            setWorkoutDetails(workout);
        }
        getWorkout();
    }, []);

    /** Handle going back to the program details. */
    function goBack() {
        navigate(`/programs/${programDetails.id}`);
    }

    if (!workoutDetails || workoutDetails.id !== +id) {
        return <LoadingSpinner />;
    }
    
    return (
        <div className="WorkoutDetails">
            <h3 className="mb-3">{workoutDetails.name}</h3>
            <p className="mb-5 smalltext">Click each exercise to learn more about it!</p>
            <table className="WorkoutDetails-table">
                <thead>
                    <tr>
                        <th>Exercise</th>
                        <th>Sets</th>
                        <th>Reps</th>
                    </tr>
                </thead>
                <tbody>
                    {workoutDetails.exercises.map(exercise => (
                        <tr key={exercise.exerciseName}>
                            <td><Link class="ExerciseLink" to={`/exercise/${exercise.exerciseName}`}>{exercise.exerciseName}</Link></td>
                            <td>{exercise.sets}</td>
                            <td>{exercise.reps}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary font-weight-bold mt-3" onClick={goBack}>Back</button>
        </div>
    )
}

export default WorkoutDetails;