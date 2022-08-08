import axios from "axios";
import { config } from "dotenv";

config();
axios.defaults.headers.common = {
  'X-API-KEY': process.env.UFC_API_KEY,
}
const url = process.env.UFC_API_URL ? process.env.UFC_API_URL : 'http://localhost:8080';

export async function getUpcomingFights() {
    return await axios
    .get(`${url}/ufc/nextEvent`)
    .then(res => {
      return res.data.data;
    })
    .catch(error => {
      console.error(error);
    });
}
