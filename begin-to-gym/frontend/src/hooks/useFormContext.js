import { useContext } from "react";
import FormContext from "../context/FormContext"

function useFormContext() {
    return useContext(FormContext);
}

export default useFormContext;