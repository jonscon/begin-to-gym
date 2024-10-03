import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext.jsx";
import "./Home.css";

/** Homepage.
 * 
 *  Shows welcome message if logged in.
 *  Shows login/signup buttons if logged out.
 * 
 *  Routed at /
 */

function Home() {
    const { currentUser } = useContext(UserContext);

    return (
        <div className="Home">
            <div className="container text-center">
                <header>
                    <h1>Begin to Gym</h1>
                    <p className="lead">A solution for your fitness goals!</p>
                    
                </header>

                {currentUser
                    ? (
                        <div>
                            <p className="lead">Welcome, {currentUser.firstName}! Ready to get started?</p>
                            <Link className="btn btn-secondary font-weight-bold mr-3"
                                to="/create">
                                    Create a Program
                            </Link>
                        </div>
                    )
                    : (
                        <span>
                            <div className="Home-mission">
                                <h3>Our Mission</h3>
                                <p>Life can be hectic, which can make working out seem daunting in your already-busy schedule. At Begin to Gym, our mission is simple: to help you simplify your fitness life. We'll simplify your goals by curating programs that fit your needs so that you don't have to!</p>
                            </div>
                            <p className="lead">Get Started Below!</p>
                            <Link className="btn btn-primary font-weight-bold me-3"
                                  to="/login">
                                    Log In
                            </Link>
                            <Link className="btn btn-primary font-weight-bold ms-3"
                                  to="/signup">
                                    Sign Up
                            </Link>
                        </span>
                    )
                }
            </div>
        </div>
    )
}

export default Home;