import { Outlet } from "react-router-dom";
import { ProgramProvider } from "../context/ProgramContext";

/** Wrap Program Routes with a ProgramProvider.
 * 
 * Rendered in Routes to pass on Program context to specific routes.
 */

function ProgramRoute() {
    return (
        <ProgramProvider>
            <Outlet />
        </ProgramProvider>
    )
}

export default ProgramRoute;