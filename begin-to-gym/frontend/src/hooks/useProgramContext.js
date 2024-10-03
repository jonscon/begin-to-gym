import { useContext } from "react";
import ProgramContext from "../context/ProgramContext"

function useProgramContext() {
    return useContext(ProgramContext);
}

export default useProgramContext;