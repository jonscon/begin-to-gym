import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useProgramContext from "../hooks/useProgramContext.js";
import GymApi from "../api";
import LoadingSpinner from "../general/LoadingSpinner";
import "./ProgramDetails.css";

/** Show the workouts and exercises in a program.
 * 
 * On mount, loads program from API.
 * 
 * Routed to at /programs/:id.
 */

function ProgramDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { programDetails, setProgramDetails } = useProgramContext();

    /** Retrieve list of current user's programs on load. */
    useEffect(() => {
        async function getProgram() {
            let program = await GymApi.getProgram(id);
            setProgramDetails(program);
        }
        getProgram();
    }, []);

    /** Handle going back to the program list. */
    function goBack() {
        navigate("/programs");
    }

    if (!programDetails || programDetails.id !== +id) {
        return <LoadingSpinner />;
    }

    return (
        <div className="ProgramDetails">
            <div className="ProgramDetails-header mb-5">
                <h2 className="mb-3">{programDetails.name}</h2>
                <h5 className="mb-3">Weeks: {programDetails.numWeeks}</h5>
                <p className="ProgramDetails-header-small">Click to see the full workouts below!</p>
            </div>
            <div className="ProgramDetails-body">
                {programDetails.workouts.map((w, index) => (
                    <Link className="WorkoutLink" key={w.id} to={`/workout/${w.id}`}>
                        <p>Day {index + 1}: {w.name}</p>
                    </Link>
                ))}
                <button className="btn btn-primary font-weight-bold mt-3" onClick={goBack}>Back</button>
            </div>
        </div>
    )
}

export default ProgramDetails;