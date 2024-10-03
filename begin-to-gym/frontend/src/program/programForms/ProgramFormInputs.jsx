import ProgramGoals from "./ProgramGoals.jsx";
import ProgramDays from "./ProgramDays.jsx";
import ProgramWeeks from "./ProgramWeeks.jsx";
import useFormContext from "../../hooks/useFormContext.js";

/** Program form inputs.
 * 
 *  Shows each separate form (split into separate components) and its components.
 * 
 *  ProgramForm -> ProgramFormInputs -> ProgramGoals, ProgramDays, ProgramWeeks
 */

function ProgramFormInputs() {
    const { page } = useFormContext();

    const display = {
        0: <ProgramGoals />,
        1: <ProgramDays />,
        2: <ProgramWeeks />
    }

    const content = (
        <div className="form-inputs flex-col">
            {display[page]}
        </div>
    )

    return content;
}

export default ProgramFormInputs;