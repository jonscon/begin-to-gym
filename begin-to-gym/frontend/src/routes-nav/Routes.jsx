import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../homepage/Home.jsx";
import LoginForm from "../auth/LoginForm.jsx";
import SignupForm from "../auth/SignupForm.jsx";
import ProgramForm from "../program/programForms/ProgramForm.jsx";
import ProgramList from "../program/ProgramList.jsx";
import ProgramDetails from "../program/ProgramDetails.jsx";
import WorkoutDetails from "../workout/WorkoutDetails.jsx";
import ExerciseDetails from "../exercise/ExerciseDetails.jsx";
import ProfileForm from "../profile/ProfileForm.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import { FormProvider } from "../context/FormContext.jsx";
import ProgramRoute from "./ProgramRoute.jsx";

// Create homepage/home, auth/login form, auth/signup form
function ReactRoutes({ login, signup }) {
    return (
        <div>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm login={login}/>} />
                <Route path="/signup" element={<SignupForm signup={signup}/>} />

                {/* Private Routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/create" element={
                        <FormProvider>
                            <ProgramForm />
                        </FormProvider>} 
                    />
                    <Route path="/programs" element={<ProgramList />} />

                    {/* ProgramProvider for shared context */}
                    <Route element={<ProgramRoute />}>
                        <Route path="/programs/:id" element={<ProgramDetails />} />
                        <Route path="/workout/:id" element={<WorkoutDetails />} />
                        <Route path="/exercise/:name" element={<ExerciseDetails />} />
                    </Route>
                    <Route path="/profile" element={<ProfileForm />} />
                </Route>

                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    )
}

export default ReactRoutes;