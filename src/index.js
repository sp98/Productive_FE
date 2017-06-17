import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReduxThunk from 'redux-thunk';
import promise from 'redux-promise';

import reducers from './reducers';
import TaskScreen from './screens/TaskScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import NewTaskScreen from './screens/NewTaskScreen';

const createStoreWithMiddleware = applyMiddleware(promise, ReduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  <div style={{ flex: 1 }}>
    <BrowserRouter>
       <Switch>
          <Route path='/:user_id/:cadence/:period' component={TaskScreen} />
          <Route path='/new' component={NewTaskScreen} />
          <Route path='/signup' component={SignUpScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/' component={WelcomeScreen} />
       </Switch>
    </BrowserRouter>
 </div>
  </Provider>
  , document.querySelector('.container'));
