import axios from 'axios';
import { config } from 'dotenv';
import { CreateMatchRequest } from './requests/createMatch.request';
import { CreateUserRequest } from './requests/createUser.request';
import { PlaceBetRequest } from './requests/placeBet.request';
import { CreateMatchResponse } from './responses/createMatch.response';
import { CreateUserResponse } from './responses/createUser.response';
import { GetWalletResponse } from './responses/getWallet.response';
import { PlaceBetResponse } from './responses/placeBet.response';

config();

const headers = {
  'X-API-KEY': process.env.BETBOT_BACKEND_KEY,
  'Content-Type': 'application/json',
}

const url =
  process.env.IS_LOCAL === 'true'
    ? process.env.BETBOT_BACKEND_URL_LOCAL
    : process.env.BETBOT_BACKEND_URL_PROD;

    export async function databaseHealth(){
      var config = {
        method: 'get',
        url: `${url}`,
        headers,
      };
      
      return axios(config)
        .then(function (response) {
        return response.data;
      })
        .catch(function (error) {
        return null;
      });
}
    
export async function getUserWalletId(createUserRequest: CreateUserRequest): Promise<CreateUserResponse> {
  var data = JSON.stringify(createUserRequest);
  
  var config = {
    method: 'post',
    url: `${url}/betbot/createUser`,
    headers,
    data,
  };
  
  return axios(config)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error.response.data);
    return null;
  });
}

export async function getWallet(walletId: string): Promise<GetWalletResponse> {
  var data = JSON.stringify({walletId: walletId});
  
  var config = {
    method: 'get',
    url: `${url}/betbot/wallet`,
    headers,
    data,
  };
  
  return axios(config)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error.response.data);
    return null;
  });
}

export async function createMatch(createMatchRequest: CreateMatchRequest): Promise<CreateMatchResponse> {
  var data = JSON.stringify(createMatchRequest);
  
  var config = {
    method: 'post',
    url: `${url}/betbot/createMatch`,
    headers,
    data,
  };
  
  return axios(config)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error.response.data);
    return null;
  });
}

export async function placeBet(placeBetRequest: PlaceBetRequest): Promise<PlaceBetResponse> {
  var data = JSON.stringify(placeBetRequest);
  
  var config = {
    method: 'post',
    url: `${url}/betbot/placeBet`,
    headers,
    data,
  };
  
  return axios(config)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error.response.data);
    return null;
  });
}


// axios.defaults.headers.common = {
//   'X-API-KEY': process.env.BETBOT_BACKEND_KEY,
//   'Content-Type': 'application/json',
// };