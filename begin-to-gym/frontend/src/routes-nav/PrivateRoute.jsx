import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../context/UserContext";

/** Protect unauthorized users from accessing:
 *  - /profile
 * 
 *  Rendered in Routes to check if there is a valid
 *  current user. If no user is present, redirect
 *  to login form.
 */

function PrivateRoute() {
    const { currentUser } = useContext(UserContext);

    if (!currentUser) {
        return <Navigate to="/" />;
    }

    return <Outlet />
}

export default PrivateRoute;