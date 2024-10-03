import useFormContext from "../../hooks/useFormContext";

/** Program days.
 * 
 *  Shows all the inputs for program days.
 *  Filter program days based on goal choice.
 * 
 *  ProgramForm -> ProgramFormInputs -> ProgramGoals, ProgramDays, ProgramWeeks
 */

function ProgramDays() {
    const { formData, handleChange } = useFormContext();
    const choices = [
        {id: 0, value: "2"}, 
        {id: 1, value: "3"}, 
        {id: 2, value: "5"},
        {id: 3, value: "6"}, 
    ]
    
    // change options for days based on goal selection
    let content;

    // beginner program: 2-day program
    if (formData.goal === "0") {
        content = (
            <div className="form-group">
                <input 
                    type="radio"
                    key={choices[0].id}
                    name="days"
                    value={choices[0].value}
                    checked={formData.days === '2'}
                    onChange={handleChange}
                />
                <label htmlFor={choices[0].id}>{choices[0].value}</label>
            </div>
        )
    }
    // strength program: 3 or 6 day program
    else if (formData.goal === "1") {
        content = (
            <>
                <div className="form-group">
                    <input 
                        type="radio"
                        key={choices[1].id}
                        name="days"
                        value={choices[1].value}
                        checked={formData.days === '3'}
                        onChange={handleChange}
                    />
                    <label htmlFor={choices[1].id}>{choices[1].value}</label>
                </div>
                <div className="form-group">
                    <input 
                        type="radio"
                        key={choices[3].id}
                        name="days"
                        value={choices[3].value}
                        checked={formData.days === '6'}
                        onChange={handleChange}
                    />
                    <label htmlFor={choices[3].id}>{choices[3].value}</label>
                </div>
            </>
            
        )
    }
    // bodybuilding program: 5-day program
    else if (formData.goal === "2") {
        content = (
            <div className="form-group">
                <input 
                    type="radio"
                    key={choices[2].id}
                    name="days"
                    value={choices[2].value}
                    checked={formData.days === '5'}
                    onChange={handleChange}
                />
                <label htmlFor={choices[2].id}>{choices[2].value}</label>
            </div>
        );
    }

    return content;
}

export default ProgramDays;