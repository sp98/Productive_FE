import { FETCH_TASK } from '../actions/types';

export default function (state = [], action) {
  switch (action.type) {
    case FETCH_TASK:
    console.log('insdie reducer for fetching tasks');
    return action.payload;

    default:
    return state;
  }
}
