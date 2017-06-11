import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import DailyTaskScreen from './screens/DailyTaskScreen';
import WeeklyTaskScreen from './screens/WeeklyTaskScreen';
import MonthlyTaskScreen from './screens/MonthlyTaskScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import NewTaskScreen from './screens/NewTaskScreen';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  <div>
    <BrowserRouter>
       <Switch>
          <Route path='/:user_id/daily/:day' component={DailyTaskScreen} />
          <Route path='/:user_id/weekly/:week' component={WeeklyTaskScreen} />
          <Route path='/:user_id/monthly/:month' component={MonthlyTaskScreen} />
          <Route path='/new' component={NewTaskScreen} />
          <Route path='/signup' component={SignUpScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/' component={WelcomeScreen} />
       </Switch>
    </BrowserRouter>
 </div>
  </Provider>
  , document.querySelector('.container'));
