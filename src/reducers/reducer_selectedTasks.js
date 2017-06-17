import { SELECT_TASK, EMPTY_SELECTED_TASKS } from '../actions/types';

const INITIAL_STATE = [];
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_TASK: {
      console.log('inside selected Tasks reducer');
      const selectedTasks = [...state];  // creating a new state using the old one.
      console.log(selectedTasks);
      if (selectedTasks.indexOf(action.payload) !== -1) {
        selectedTasks.splice(selectedTasks.indexOf(action.payload), 1);
      } else {
        selectedTasks.push(action.payload);
      }
      return selectedTasks;
    }

    case EMPTY_SELECTED_TASKS:
    return INITIAL_STATE;
    
    default:
    return state;
  }
}
