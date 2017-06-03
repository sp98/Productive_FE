import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  state = { selectedTab: '' };

  onTabSelection(period) {
    console.log(`selecting ${period} tab`);
    this.setState({ selectedTab: period });
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

      </div>
    );
  }
}

export default Header;
