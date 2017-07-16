import { HIDE_MODALS, SHOW_MODALS } from '../actions/types';

const INITIAL_STATE = '';

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_MODALS:
    console.log('show modals reducer');
    return action.payload;
    case HIDE_MODALS:
    return INITIAL_STATE;
    default:
    return state;
  }
}
