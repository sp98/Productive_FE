import axios from 'axios';

import { LOGIN_USER,
  LOGOUT_USER,
  SHOW_NOTIFICATIONS } from './types';

const ROOT_URL = 'http://127.0.0.1:8000/api/v1/';
const LOGIN_END_POINT = 'login/';
const userID = localStorage.getItem('user_id');

export function userLogin(values, callback) {
  //console.log(`Trying to login with - ${JSON.stringify(values)} `);
  return (dispatch) => {
    axios.post(`${ROOT_URL}${LOGIN_END_POINT}`, values)
    .then((response) => loginUserSuccess(dispatch, response))
    .then(() => callback());
  };
}

const loginUserSuccess = (dispatch, response) => {
  dispatch({
    type: LOGIN_USER,
    payload: response
  });
};

export function userLogout(callback) {
  return (dispatch) => {
    axios({
      method: 'post',
      url: `${ROOT_URL}logout/`,
      data: { user_id: userID },
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then((response) => userLogoutSuccess(dispatch, response))
    .then(() => callback());
  };
}

const userLogoutSuccess = (dispatch, response) => {
  dispatch({
    type: LOGOUT_USER,
    payload: response
  });
};

export function showNotification(display, type, message) {
  const data = { display, type, message };
  return (
    {
      type: SHOW_NOTIFICATIONS,
      payload: data
    }

  );
}
