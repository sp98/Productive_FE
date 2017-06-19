import { SHOW_NOTIFICATIONS, HIDE_NOTIFICATIONS } from '../actions/types';

export default function (state, action) {
  switch (action.type) {
    case SHOW_NOTIFICATIONS:
    return action.payload;
    case HIDE_NOTIFICATIONS:
    return action.payload;
    default:
    return state;
  }
}
