import { Link } from "react-router-dom";
import GymApi from "../api";
import "./ProgramCard.css";

/** Show information of a program on a card. 
 * 
 * Rendered by ProgramList to show a program card.
 * 
 * ProgramList -> ProgramCard
*/

function ProgramCard({ id, name, numWeeks, numDays, deleteProgram }) {

    /** Handle program deletion. */
    function handleDelete(e) {
        e.preventDefault();
        deleteProgram(id);
    }

    return (
        <div className="ProgramCard">
            <Link className="ProgramCard-container" to={`/programs/${id}`}>
                <div className="ProgramCard-body">
                    <h5 className="ProgramCard-title">
                        {name}
                    </h5>
                    <p><small>Number of Weeks: {numWeeks}</small></p>
                    <p><small>Number of Days: {numDays}</small></p>
                </div>
            </Link>
            <button 
                className="btn btn-danger font-weight-bold float-right"
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    )
}

export default ProgramCard;