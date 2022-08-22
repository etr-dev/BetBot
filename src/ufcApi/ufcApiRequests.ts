import axios from "axios";
import { config } from "dotenv";

config();
const headers = {
  'X-API-KEY': process.env.UFC_API_KEY,
  'Content-Type': 'application/json',
}

const url =
  process.env.IS_LOCAL === 'true'
    ? process.env.UFC_API_URL_LOCAL
    : process.env.UFC_API_URL_PROD;

export async function getUpcomingFights() {
  var config = {
    method: 'get',
    url: `${url}/ufc/nextEvent`,
    headers,
  };
  
  return axios(config)
  .then(function (response) {
    return response.data.data;
  })
  .catch(function (error) {
    console.log(error);
    return null;
  });
}

export async function getEventByUrl(eventUrl: string) {
  console.log(eventUrl);
  var config = {
    method: 'get',
    url: `${url}/ufc/eventByUrl`,
    params: {url: eventUrl},
    headers,
  };
  
  return axios(config)
  .then(function (response) {
    return response.data.data;
  })
  .catch(function (error) {
    console.log(error);
    return null;
  });
}