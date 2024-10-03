import { createContext, useState } from "react";

/** Context for Program Form.
 * 
 * This will contain the form data, next and previous button functions,
 * and functions to disable the buttons until required fields are filled.
 * 
 * Used in ProgramForm, ProgramFormInputs, ProgramGoals, ProgramDays, and ProgramWeeks.
 */

const FormContext = createContext({})

export const FormProvider = ({ children }) => {
    const title = {
        0: 'Program Goals',
        1: 'Days Per Week',
        2: 'Number of Weeks'
    }
    const description = {
        0: 'What is your goal for this program?',
        1: 'How many days a week do you want to commit to the gym?',
        2: 'How many weeks do you want this program to be?'
    }

    const [page, setPage] = useState(0);

    const [formData, setFormData] = useState({
        goal: "",
        days: "",
        weeks: ""
    })

    // used as checks to make sure that each page has an input selected
    const canNextPage1 = Object.keys(formData)
        .filter(key => key.startsWith('goal'))
        .map(key => formData[key])
        .every(Boolean);
    
    const canNextPage2 = Object.keys(formData)
        .filter(key => key.startsWith('days'))
        .map(key => formData[key])
        .every(Boolean);

    // used to disable button if inputs are not selected
    const disablePrev = page === 0;

    const disableNext = 
    (page === Object.keys(title).length - 1) ||
    (page === 0 && !canNextPage1) ||
    (page === 1 && !canNextPage2);

    const canSubmit = page === Object.keys(title).length - 1 && [...Object.values(formData)].every(Boolean);

    // hides "previous" button on first page
    const prevHide = page === 0 && "remove-button";

    // hides "next" button on last page
    const nextHide = page === Object.keys(title).length - 1 && "remove-button";

    // hides "submit" button on any page but the last page
    const submitHide = page !== Object.keys(title).length - 1 && "remove-button";

    // handle form change
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
        if (name === "goal") {
            setFormData(prevData => ({...prevData, ["days"]: ""}));
        }
    }

    return (
        <FormContext.Provider value={{ title, description, page, setPage, formData, setFormData, handleChange,
        disablePrev, disableNext, canSubmit, prevHide, nextHide, submitHide }}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContext;