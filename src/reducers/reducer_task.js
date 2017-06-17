import { FETCH_TASK, CREATE_TASK, DELETE_TASK } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_TASK:
    console.log('insdie reducer for fetching tasks');
    return action.payload;

    case CREATE_TASK:
    console.log('inside reducer for creating task');
    return action.payload;

    case DELETE_TASK:
    console.log('inside reducer for deleting tasks');
    return action.payload;

    default:
    return state;
  }
}
