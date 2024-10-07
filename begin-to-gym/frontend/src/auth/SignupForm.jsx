import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../general/LoadingSpinner.jsx"
import Alert from "../general/Alert";
import "./SignupForm.css";

/** Signup form.
 * 
 *  Shows form and manages updpate to state on changes.
 *  On form submission, calls signup prop and
 *  redirects to /companies route.
 * 
 *  Routed as /signup.
 */

function SignupForm({ signup }) {
    const navigate = useNavigate();
    const [signedUp, setSignedUp] = useState(true);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    });
    const [formErrors, setFormErrors] = useState([]);

     /** Handles form submit.
     * 
     *  Calls login function prop -> redirects to /companies if successful
     */

     async function handleSubmit(e) {
        e.preventDefault();
        setSignedUp(false);
        let result = await signup(formData);
        if (result.success) {
            setSignedUp(true);
            navigate("/");
        }
        else {
            setSignedUp(true);
            setFormErrors(result.err);
        }
    }

    /** Update state. */
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData(data => ({...data, [name]: value }));
    }

    /** Show loading spinner while user is being logged in. */
    if (!signedUp) {
        return <LoadingSpinner />;
    }

    return (
        <div className="SignupForm">
            <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
                <h3 className="mb-3">Sign Up</h3>

                <div className="card">
                    <div className="card-body">
                        <form className="SignupForm-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    name="username"
                                    className="form-control"
                                    value={formData.username}
                                    onChange={handleChange}  
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
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    name="firstName"
                                    className="form-control"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required                                    
                                />
                            </div>

                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    name="lastName"
                                    className="form-control"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required                                 
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {formErrors.length
                                ? <Alert type="danger" messages={formErrors} />
                                : null}

                                <button 
                                    className="btn btn-primary float-right" 
                                    onSubmit={handleSubmit}>
                                        Submit
                                </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;