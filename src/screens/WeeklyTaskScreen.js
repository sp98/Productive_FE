import React, { Component } from 'react';
import Header from '../components/Layout';

class WeeklyTaskScreen extends Component {
  render() {
    return (
      <div>
      <Header history={this.props.history} />
      <div> Weekly Tasks </div>
      </div>
    );
  }
}

export default WeeklyTaskScreen;
