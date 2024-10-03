import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useProgramContext from "../hooks/useProgramContext.js";
import GymApi from "../api";
import LoadingSpinner from "../general/LoadingSpinner";
import "./ExerciseDetails.css";

/** Show the exercise details in a program.
 * 
 * On mount, loads exercise from API.
 * 
 * Routed to at /exercise/:id
 */

function ExerciseDetails() {
    const { name } = useParams();
    const navigate = useNavigate();
    const { exerciseDetails, setExerciseDetails, workoutDetails } = useProgramContext();

    /** Retrieve exercise details on load. */
    useEffect(() => {
        async function getExercise() {
            let exercise = await GymApi.getExercise(name);
            setExerciseDetails(exercise);
        }
        getExercise();
    }, []);

    /** Handle going back to the workout details. */
    function goBack() {
        navigate(`/workout/${workoutDetails.id}`);
    }

    if (!exerciseDetails || exerciseDetails.name !== name) {
        return <LoadingSpinner />;
    }
    
    return (
        <div className="ExerciseDetails">
            <div className="ExerciseDetails-header mb-3">
                <h3>{exerciseDetails.name}</h3>
            </div>
            <div className="ExerciseDetails-body">
                <h6 className="ExerciseDetails-subheader">Description:</h6>
                <p>{exerciseDetails.description}</p>

                <h6 className="ExerciseDetails-subheader">Muscles Used:</h6>
                <ul className="ExerciseDetails-muscles">
                    <li>{exerciseDetails.muscles_primary}</li>
                    {exerciseDetails.muscles_secondary ? 
                    <li>{exerciseDetails.muscles_secondary}</li>
                        : ""
                    }
                </ul>
            </div>
            <button className="btn btn-primary font-weight-bold mt-3" onClick={goBack}>Back</button>

        </div>
    )
}

export default ExerciseDetails;