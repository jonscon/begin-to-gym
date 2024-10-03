import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import GymApi from "../api";
import UserContext from "../context/UserContext";
import ProgramCard from "./ProgramCard.jsx";
import LoadingSpinner from "../general/LoadingSpinner";
import "./ProgramList.css";

/** Show list of user programs on program cards.
 * 
 * On mount, loads programs from API.
 * 
 * Routed to at /programs.
 */

function ProgramList() {
    const { currentUser } = useContext(UserContext);
    const [programs, setPrograms] = useState(null);

    /** Retrieve list of current user's programs on load. */
    useEffect(() => {
        async function getPrograms() {
            let programs = await GymApi.getUserPrograms(currentUser.username);
            setPrograms(programs);
        }
        getPrograms();
    }, [currentUser]);

    /** Delete program. */
    async function deleteProgram(id) {
        await GymApi.deleteProgram(id);
        setPrograms(programs.filter(p => p.id !== id));
    }

    if (!programs) {
        return <LoadingSpinner />;
    }

    return (
        <div className="ProgramList">
            <h2 className="mb-5">My Programs</h2>
            <div className="ProgramList-list">
                {programs.length === 0 ? 
                <div className="ProgramList-empty">
                    <p>No programs yet. Go back to the homepage to create one!</p>
                    <Link className="btn btn-primary" to="/">Back to Home</Link>
                </div>

                : programs.map(p => (
                    <ProgramCard 
                        key={p.id}
                        id={p.id}
                        name={p.name}
                        numWeeks={p.numWeeks}
                        numDays={p.numDays}
                        deleteProgram={deleteProgram}
                    />
                ))}
            </div>
        </div>
    )
}

export default ProgramList;