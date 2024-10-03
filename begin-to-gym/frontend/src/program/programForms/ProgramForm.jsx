import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GymApi from "../../api.js";
import ProgramFormInputs from "./ProgramFormInputs.jsx";
import UserContext from "../../context/UserContext.jsx";
import useFormContext from "../../hooks/useFormContext.js";
import "./ProgramForm.css";

/** Program form.
 * 
 *  Shows form and manages updpate to state on changes.
 *  On form submission, create program and reroute to program
 *  page.
 * 
 *  The goal of the programs correspond to certain numbers.
 *  - 0: Beginner Prograam
 *  - 1: Strength Program
 *  - 2: Bodybuilding Program
 * 
 *  Routed at /create.
 */

function ProgramForm() {
    const { currentUser } = useContext(UserContext);
    const {
        page,
        setPage,
        formData,
        title,
        description,
        disablePrev,
        disableNext,
        canSubmit,
        prevHide,
        nextHide,
        submitHide
    } = useFormContext();
    const navigate = useNavigate();

    // set page count back 1
    function handlePrev() {
        setPage(prev => prev - 1);
    }

    // set page count forward 1
    function handleNext() {
        setPage(prev => prev + 1);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let name;

        if (formData.goal === "0") {
            name = "Beginner Program";
        } else if (formData.goal === "1") {
            name = "Strength Build Program (Powerlifting)"
        } else if (formData.goal === "2") {
            name = "Body Transformation Program (Bodybuilding)"
        }

        let programData = {
            name: name,
            type: formData.goal,
            numWeeks: formData.weeks,
            numDays: formData.days,
            username: currentUser.username,
        }

        await GymApi.createProgram(programData);
        navigate("/programs");
    }

    const content = (
        <div className="ProgramForm">
            <div className="container w-50">
                    <h2 className="mb-5">Create Your Program</h2>

                    <div className="card">
                        <div className="card-body">
                            <form className="ProgramForm-form" onSubmit={handleSubmit}>
                                <header>
                                    <h3 className="mb-3">{title[page]}</h3>
                                    <p>{description[page]}</p>
                                    <small className="subtext">{page === 1 ? "(We recommend the below number of days based on your goal.)" : ""}</small>
                                    <div className="button-container">
                                        <button
                                            type="button"
                                            id={prevHide}
                                            className={`btn btn-secondary float-right button`}
                                            onClick={handlePrev}
                                            disabled={disablePrev}>
                                                Prev
                                        </button>
                                        <button
                                            type="button"
                                            id={nextHide}
                                            className={`btn btn-secondary float-right button`}
                                            onClick={handleNext}
                                            disabled={disableNext}>
                                                Next
                                        </button>
                                        <button 
                                            type="submit"
                                            id={submitHide}
                                            className={`btn btn-primary float-right button`} 
                                            onSubmit={handleSubmit}
                                            disabled={!canSubmit}>
                                                Submit
                                        </button>
                                    </div>
                                </header>

                                <ProgramFormInputs />
                            
                            </form>
                        </div>
                    </div>
            </div>
        </div>
    )

    return content;
}

export default ProgramForm;