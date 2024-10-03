import useFormContext from "../../hooks/useFormContext";

/** Program goals.
 * 
 *  Shows all the inputs for program goals.
 * 
 *  ProgramForm -> ProgramFormInputs -> ProgramGoals, ProgramDays, ProgramWeeks
 */

function ProgramGoals() {
    const { formData, handleChange } = useFormContext();
    const choices = [
        {id: 0, value: "Just starting and looking to stay consistent"}, 
        {id: 1, value: "Looking to increase strength (powerlifting-style workouts)"}, 
        {id: 2, value: "Looking to build muscle and improve body composition"}
    ]

    return (
        <>
            <div className="form-group">
                <input 
                    type="radio"
                    id={choices[0].id}
                    key={choices[0].id}
                    name="goal"
                    value={choices[0].id}
                    checked={formData.goal === '0'}
                    onChange={handleChange}
                />
                <label htmlFor={choices[0].id}>{choices[0].value}</label>
            </div>
            <div className="form-group">
                <input 
                    type="radio"
                    id={choices[1].id}
                    key={choices[1].id}
                    name="goal"
                    value={choices[1].id}
                    checked={formData.goal === '1'}
                    onChange={handleChange}
                />
                <label htmlFor={choices[1].id}>{choices[1].value}</label>
            </div>
            <div className="form-group">
                <input 
                    type="radio"
                    id={choices[1].id}
                    key={choices[2].id}
                    name="goal"
                    value={choices[2].id}
                    checked={formData.goal === '2'}
                    onChange={handleChange}
                />
                <label htmlFor={choices[2].id}>{choices[2].value}</label>
            </div>
        </>
    )
}

export default ProgramGoals;