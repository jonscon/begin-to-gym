import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import UserContext from "../context/UserContext";
import "./NavBar.css";

/** NavBar
 * 
 * Rendered in Routes.
 */

function NavBar({ logout }) {
    const { currentUser } = useContext(UserContext);

    function loggedInNavBar() {
        return (
            <Nav className="navbar-nav ml-auto">
                <NavItem className="nav-item mr-4">
                    <NavLink className="nav-link" to="/create">Create Program</NavLink>
                </NavItem>
                <NavItem className="nav-item mr-4">
                    <NavLink className="nav-link" to="/programs">My Programs</NavLink>
                </NavItem>
                <NavItem className="nav-item mr-4">
                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                </NavItem>
                <NavItem className="nav-item mr-4">
                    <NavLink className="nav-link" to="/" onClick={logout}>
                        Log out {currentUser.first_name || currentUser.username}
                    </NavLink>
                </NavItem>
            </Nav>
        )
    }

    function loggedOutNavBar() {
        return (
            <Nav className="navbar-nav ml-auto">
                <NavItem className="nav-item mr-4"> 
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                </NavItem>
                <NavItem className="nav-item mr-4">
                    <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                </NavItem>
            </Nav>
        )
    }

    return (
        <Navbar className="Navigation navbar navbar-expand-md">
            <NavLink className="navbar-brand" to="/">
                Begin to Gym
            </NavLink>
            {currentUser ? loggedInNavBar() : loggedOutNavBar()}
        </Navbar>
    )
}

export default NavBar;