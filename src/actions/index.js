import axios from 'axios';

import { LOGIN_USER, CREATE_TASK, FETCH_TASK } from './types';

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

export function createTask(userID, values, callback) {
  console.log('inside action creator for creating task');
  const request = axios({
    method: 'post',
    url: `${ROOT_URL}${userID}/daily/`,
    data: values,
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
  .then(() => callback());

  return {
    type: CREATE_TASK,
    payload: request
  };
}

export function fetchTasks(userID, date) {
  console.log('inside action creator for fetching tasks');
  const request = axios({
    method: 'get',
    data: date,
    url: `${ROOT_URL}${userID}/daily/`,
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  });

  return {
    type: FETCH_TASK,
    payload: request
  }
}
