import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../general/LoadingSpinner.jsx"
import Alert from "../general/Alert";
import "./LoginForm.css";

/** Login form.
 * 
 *  Shows form and manages updpate to state on changes.
 *  On form submission, calls login function prop and
 *  redirects to /companies route.
 * 
 *  Routed as /login.
 */

function LoginForm({ login }) {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    /** Handles form submit.
     * 
     *  Calls login function prop -> redirects to /companies if successful
     */

    async function handleSubmit(e) {
        e.preventDefault();
        setLoggedIn(false);
        let result = await login(formData);
        if (result.success) {
            setLoggedIn(true);
            navigate("/");
        }
        else {
            console.log(result, formErrors.length);
            setFormErrors(result.err);
        }
    }

    /** Update state. */
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({...data, [name]: value }));
    }

    /** Show loading spinner while user is being logged in. */
    if (!loggedIn) {
        return <LoadingSpinner />;
    }

    return (
        <div className="LoginForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">Log In</h3>

                <div className="card">
                    <div className="card-body">
                        <form className="LoginForm-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleChange}
                                    autoComplete="username"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                    required
                                />
                            </div>

                            {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null}

                                <button 
                                    className="btn btn-primary float-right">
                                        Submit
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;