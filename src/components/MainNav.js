import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MainNav extends Component {
  state = { selectedTab: 'daily' };

  onTabSelection(period) {
    this.setState({ selectedTab: period });
  }
  
  render() {
    return (
      <div>
      <ul className="nav nav-pills nav-justified">
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

      </div>
    );
  }
}

export default MainNav;
