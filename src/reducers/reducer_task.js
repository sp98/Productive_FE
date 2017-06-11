import { CREATE_TASK } from '../actions/types';

export default function (state = ' ', action) {
  switch (action.type) {
    case CREATE_TASK:
    console.log('inside reducer for creating task');
    return action.payload;
    default:
    return state;
  }
}
