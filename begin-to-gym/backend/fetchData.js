// const axios = require("axios");

// const BASE_URL = "https://wger.de/api/v2";

// /** Fetch data from the API and store it in database. 
//  * 
//  * Data: Categories and Exercise List
// */


// /** Helper function to call external API */
// async function request(endpoint, params = {}, method = "get") {
//     const url = `${BASE_URL}/${endpoint}`;
//     try {
//         return (await axios({ url, method, params })).data; 
//     } catch (err) {
//         console.error("API Error:", err.response);
//         let message = err.response.data.error.message;
//         throw Array.isArray(message) ? message : [message];
//     }
// }

// async function getCategories(req, res, next) {
//     try {
//         const data = await request("exercisecategory");
//         console.log(data.results);
//         return res.json({ categories: data.results });
//     } catch (err) {
//         return next(err);
//     }
// }

// getCategories();