import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

import { userLogout, fetchTasks } from '../actions';

class Header extends Component {
  state = { selectedTab: '' };

  onTabSelection(cadence, date) {
    this.setState({ selectedTab: cadence });
    const userID = localStorage.getItem('user_id');

    this.props.fetchTasks(userID, date, cadence, () => {
      this.props.history.push({
        pathname: `/${userID}/${cadence}/${date}`,
        state: {
          selectedDate: date,
          cadence
        } });
    });
  }

  onLogout() {
      this.props.userLogout(() => {
         this.props.history.push('/login');
         localStorage.removeItem('token');
         localStorage.removeItem('user_id');
      });
  }


  render() {
    //console.log(`Selected tab is ----> ${this.state.selectedTab}`);
    return (
      <div style={styles.navBarStyle}>
      <nav className="navbar navbar-default bg-faded" role="navigation">
      <ul className="navbar-nav list-unstyled">
        <li className="nav-item col-sm-2" >
           <button
           className={this.state.selectedTab === 'daily' ? 'nav-link active' : 'nav-link'}
           onClick={() => this.onTabSelection('Daily', moment().format('YYYY-MM-DD'))}
           >Daily</button>
        </li>
        <li className="nav-item col-sm-2">
          <button
          className={this.state.selectedTab === 'weekly' ? 'nav-link active' : 'nav-link'}
          onClick={() => this.onTabSelection('Weekly', `${moment().year()}-${moment().week()}`)}
          >Weekly</button>
        </li>
        <li className="nav-item col-sm-2">
          <button
          className={this.state.selectedTab === 'monthly' ? 'nav-link active' : 'nav-link'}
          to='/monthly_tasks'
          onClick={() => this.onTabSelection('Monthly', moment().format('YYYY-MM'))}
          >Monthly</button>
        </li>
        <li className="nav-item col-sm-2">
        <button className="btn btn-primary" onClick={() => this.onLogout()}>
          Logout
         </button>
         </li>
       </ul>
       </nav>
      </div>
    );
  }
}

const styles = {
  navBarStyle: {
    marginTop: '4px'
  }
};

export default connect(null, { fetchTasks, userLogout })(Header);
