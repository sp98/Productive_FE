import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import axios from 'axios';

const ROOT_URL = 'http://127.0.0.1:8000/api/v1/';
const LOGOUT_USER_END_POINT = 'logout/';

class Header extends Component {
  state = { selectedTab: '' };

  onTabSelection(period) {
    console.log(`selecting ${period} tab`);
    this.setState({ selectedTab: period });
  }

  onLogout() {
    if (this.props.user_id) {
      console.log(this.props.user_id);
      console.log(this.props.token);
      axios({
        method: 'post',
        url: `${ROOT_URL}${LOGOUT_USER_END_POINT}`,
        data: { user_id: localStorage.getItem('user_id') },
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
      .then(() => {
        this.props.history.push('login/');
        this.setState = { token: '' };
    });
  }
}
  render() {
    console.log(`Selected tab is ----> ${this.state.selectedTab}`);
    return (
      <div>
      <ul className="nav nav-pills nav-fill">
        <li className="nav-item">
           <Link
           className={this.state.selectedTab === 'daily' ? 'nav-link active' : 'nav-link'}
           to='/daily_tasks'
           onClick={() => this.onTabSelection('daily')}
           >Daily</Link>
        </li>
        <li className="nav-item">
          <Link
          className={this.state.selectedTab === 'weekly' ? 'nav-link active' : 'nav-link'}
          to='/weekly_tasks'
          onClick={() => this.onTabSelection('weekly')}
          >Weekly</Link>
        </li>
        <li className="nav-item">
          <Link
          className={this.state.selectedTab === 'monthly' ? 'nav-link active' : 'nav-link'}
          to='/monthly_tasks'
          onClick={() => this.onTabSelection('monthly')}
          >Monthly</Link>
        </li>
       </ul>

        <div className="pull-right">
        <button
        className="btn btn-primary"
         onClick={() => this.onLogout()}
        >
         Logout
         </button>
         </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  if (state.authCreds) {
    return {
      user_id: state.authCreds.data.user_id,
      token: state.authCreds.data.token
    };
  }

  return { user_id: ' ' };
};

export default connect(mapStateToProps)(Header);
