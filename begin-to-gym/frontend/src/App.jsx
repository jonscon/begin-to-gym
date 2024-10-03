import { useState, useEffect } from 'react'
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./hooks/useLocalStorage";

import NavBar from "./routes-nav/NavBar.jsx";
import ReactRoutes from "./routes-nav/Routes.jsx";
import LoadingSpinner from "./general/LoadingSpinner";

import UserContext from './context/UserContext.jsx';
import { decodeToken } from "react-jwt";
import GymApi from "./api";
import "./App.css";

// Key name for localStorage - used for "remember me" when logging back in
export const TOKEN_STORAGE_ID = "gym-token";

/** Begin to Gym Application.
 * 
 * - currentUser: user object from API. Used to tell if someone
 *   is logged in. This is ppassed around through context
 *   throughout app.
 * 
 * - token: for logged in users, this is their authentication JWT.
 *   Required to be set for most API ccalls. This is initially read 
 *   from localStorage and synced to there via useLocalStorage hook.
 */

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = decodeToken(token);
          // set token on Api calls so it can be used to call API.
          GymApi.token = token;
          let currentUser = await GymApi.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  /** Handles signup. */
  async function signup(data) {
    try {
      let token = await GymApi.signup(data);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("signup failed", err);
      return { success: false, err };
    }
  }

  /** Handles login. */
  async function login(data) {
    try {
      let token = await GymApi.login(data);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("login failed", err);
      return { success: false, err };
    }
  }

  /** Handles logout. */
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  if (!infoLoaded) return <LoadingSpinner />

  return (
      <BrowserRouter>
        <UserContext.Provider
            value={{ currentUser, setCurrentUser }}>
          <div className="App">
            <NavBar logout={logout} />
            <ReactRoutes login={login} signup={signup} />
          </div>
        </UserContext.Provider>
      </BrowserRouter>
  );
}

export default App;
