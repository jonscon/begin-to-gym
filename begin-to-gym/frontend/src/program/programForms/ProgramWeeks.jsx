import useFormContext from "../../hooks/useFormContext";

/** Program weeks.
 * 
 *  Shows all the inputs for program weeks.
 * 
 *  ProgramForm -> ProgramFormInputs -> ProgramGoals, ProgramDays, ProgramWeeks
 */

function ProgramWeeks() {
    const { formData, handleChange } = useFormContext();
    const choices = [
        {id: 0, value: "4"}, 
        {id: 1, value: "8"}, 
        {id: 2, value: "12"},
    ]

    return (
        <>
            <div className="form-group">
                <input 
                    type="radio"
                    key={choices[0].id}
                    name="weeks"
                    value={choices[0].value}
                    checked={formData.weeks === '4'}
                    onChange={handleChange}
                />
                <label htmlFor={choices[0].id}>{choices[0].value}</label>
            </div>
            <div className="form-group">
                <input 
                    type="radio"
                    key={choices[1].id}
                    name="weeks"
                    value={choices[1].value}
                    checked={formData.weeks === '8'}
                    onChange={handleChange}
                />
                <label htmlFor={choices[1].id}>{choices[1].value}</label>
            </div>
            <div className="form-group">
                <input 
                    type="radio"
                    key={choices[2].id}
                    name="weeks"
                    value={choices[2].value}
                    checked={formData.weeks === '12'}
                    onChange={handleChange}
                />
                <label htmlFor={choices[2].id}>{choices[2].value}</label>
            </div>
        </>
    )
}

export default ProgramWeeks;