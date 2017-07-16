import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import reducerAuth from './reducer_auth';
import reducerTask from './reducer_task';
import reducerSelectedTasks from './reducer_selectedTasks';
import reducerNofiy from './reducer_notify';
import reducerModal from './ModalReducer';

const rootReducer = combineReducers({
  form: formReducer,
  authCreds: reducerAuth,
  tasks: reducerTask,
  selectedTasks: reducerSelectedTasks,
  notify: reducerNofiy,
  currentModal: reducerModal
});

export default rootReducer;
