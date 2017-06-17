import { LOGIN_USER } from '../actions/types';

export default function (state = '', action) {
  switch (action.type) {

    case LOGIN_USER :
    console.log(`login user with --> ${action.payload}`);
    return action.payload;

    default:
    return state;
  }
}
