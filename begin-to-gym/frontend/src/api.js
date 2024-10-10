import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 * 
 * Static class tying together methods used to get/send to the backend.
 * No frontend-specific stuff here, and no API-aware stuff elsewhere
 * on the frontend.
 */

class GymApi {
    // token for interacting with API
    static token;

    // general request function for all endpoints
    static async request(endpoint, data = {}, method = "get") {
        console.debug("API Call:", endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${GymApi.token}` };
        const params = (method === "get")
            ? data
            : {};
        // console.log(url);
        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Individual API Routes

      /** Get the current user. */

    static async getCurrentUser(username) {
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    /** Get token for login from username, password. */

    static async login(data) {
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    /** Signup for site. */

    static async signup(data) {
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    /** Save user profile page. */

    static async saveProfile(username, data) {
        let res = await this.request(`users/${username}`, data, "patch");
        return res.user;
    }

    /** Create a new program. */

    static async createProgram(data) {
        let res = await this.request(`program/create`, data, "post");
        return res.program;
    }

    /** Get list of programs that a user created. */
    static async getUserPrograms(username) {
        let res = await this.request(`users/${username}/programs`);
        return res.programs;
    }

    /** Get details on a program. */
    static async getProgram(id) {
        let res = await this.request(`program/${id}`);
        return res.program;
    }

    /** Delete a program. */
    static async deleteProgram(id) {
        await this.request(`program/${id}`, {}, "delete");
    }

    /** Get details on a workout and its exercises. */
    static async getWorkout(id) {
        let res = await this.request(`workout/${id}`);
        return res.workout;
    }

    /** Get details on an exercise. */
    static async getExercise(name) {
        let res = await this.request(`exercise/${name}`);
        return res.exercise;
    }


}

export default GymApi;