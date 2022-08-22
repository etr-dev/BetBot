import axios from 'axios';
import { config } from 'dotenv';
import { CreateMatchDto } from 'src/dtos/createMatch.dto';
import { CreateUserDto } from 'src/dtos/createUser.dto';
import { PlaceBetDto } from 'src/dtos/placeBet.dto';
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

export async function getUserWalletId(createUserDto: CreateUserDto): Promise<CreateUserResponse> {
  var data = JSON.stringify(createUserDto);
  
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
    console.log(error);
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
    console.log(error);
    return null;
  });
}

export async function createMatch(createMatchDto: CreateMatchDto): Promise<CreateMatchResponse> {
  var data = JSON.stringify(createMatchDto);
  
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
    console.log(error);
    return null;
  });
}

export async function placeBet(placeBetDto: PlaceBetDto): Promise<PlaceBetResponse> {
  var data = JSON.stringify(placeBetDto);
  
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
    console.log(error);
    return null;
  });
}


// axios.defaults.headers.common = {
//   'X-API-KEY': process.env.BETBOT_BACKEND_KEY,
//   'Content-Type': 'application/json',
// };