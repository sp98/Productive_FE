import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import reducers from './reducers';
import DailyTaskScreen from './screens/DailyTaskScreen';
import WeeklyTaskScreen from './screens/WeeklyTaskScreen';
import MonthlyTaskScreen from './screens/MonthlyTaskScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
  <div>
    <BrowserRouter>
       <Switch>
          <Route path='/daily_tasks' component={DailyTaskScreen} />
          <Route path='/weekly_tasks' component={WeeklyTaskScreen} />
          <Route path='/monthly_tasks' component={MonthlyTaskScreen} />
          <Route path='/signup' component={SignUpScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/' component={WelcomeScreen} />
       </Switch>
    </BrowserRouter>
 </div>
  </Provider>
  , document.querySelector('.container'));
