import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import reducerAuth from './reducer_auth';
import reducerTask from './reducer_task';
import reducerFetch from './reducer_fetch';

const rootReducer = combineReducers({
  form: formReducer,
  authCreds: reducerAuth,
  taskStatus: reducerTask,
  tasks: reducerFetch
});

export default rootReducer;
