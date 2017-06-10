import axios from 'axios';

import { LOGIN_USER } from './types';

const ROOT_URL = 'http://127.0.0.1:8000/api/v1/';
const LOGIN_END_POINT = 'login/';

export function userLogin(values) {
  //console.log(`Trying to login with - ${JSON.stringify(values)} `);
  const request = axios.post(`${ROOT_URL}${LOGIN_END_POINT}`, values);
  //console.log(`inside user login action create - ${JSON.stringify(request)}`);
  return {
    type: LOGIN_USER,
    payload: request
};
}
