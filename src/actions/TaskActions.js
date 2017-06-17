import axios from 'axios';

import {
  CREATE_TASK,
  FETCH_TASK,
  SELECT_TASK,
  DELETE_TASK,
  EMPTY_SELECTED_TASKS,
} from './types';

const ROOT_URL = 'http://127.0.0.1:8000/api/v1/';

// const endPoints = (values) => {
//    if (values.taskCadence === 'Daily') {
//       return 'daily_tasks';
//    } else if (values.taskCadence === 'Monthly') {
//      return 'monthly_tasks';
//    } else if (values.taskCadence === 'Weekly') {
//      return 'weekly_tasks';
//    }
// };

export function createTask(userID, values, callback) {
  //console.log('inside action creator for creating task');

  return (dispatch) => {
    axios({
      method: 'post',
      url: `${ROOT_URL}tasks/`,
      data: values,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then((response) => createTaskSuccess(dispatch, response))
    .then(() => callback());
  };
}

const createTaskSuccess = (dispatch, response) => {
  dispatch({
    type: CREATE_TASK,
    payload: response
  });
};

export function fetchTasks(userID, date, cadence, callback) {
  const data = { userID, date, cadence };
//  console.log('inside action creator for fetching tasks');

  return (dispatch) => {
    axios({
      method: 'post',
      data,
      url: `${ROOT_URL}fetch_tasks/`,
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
    .then((response) => fetchTaskSuccess(dispatch, response))
    .then(() => callback());
  };
}

const fetchTaskSuccess = (dispatch, response) => {
  dispatch({
   type: FETCH_TASK,
   payload: response
 });
};

/*
 Deleting Tasks
 */
export function deleteTasks(tasks, callback) {
  //console.log('inside delete tasks action creator');
  return (dispatch) => {
    axios({
     method: 'delete',
     url: `${ROOT_URL}tasks/`,
     data: tasks,
     headers: {
       Authorization: `Token ${localStorage.getItem('token')}`
     }
   })
   .then((response) => taskDeleteSuccess(dispatch, response))
   .then(() => callback());
  };
}

const taskDeleteSuccess = (dispatch, response) => {
  dispatch({
    type: DELETE_TASK,
    payload: response
  });
};


export function selectTasks(task) {
  //console.log('inside selected Tasks action creator');
  return {
    type: SELECT_TASK,
    payload: task
  };
}

export function emptySelectedTasks() {
//  console.log('inside empyty selected Tasks action creator');
   return {
     type: EMPTY_SELECTED_TASKS,
   };
}
