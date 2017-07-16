import { SHOW_NOTIFICATIONS, HIDE_NOTIFICATIONS } from '../actions/types';

const INITIAL_STATE = { display: false, type: '', message: '' };
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_NOTIFICATIONS:
    return action.payload;
    case HIDE_NOTIFICATIONS:
    return INITIAL_STATE;
    default:
    return state;
  }
}
