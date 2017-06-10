import React, { Component } from 'react';

import Header from '../components/Header';

class DailyTaskScreen extends Component {
  render() {
    return (
      <div>
      <Header history={this.props.history} />
      <div> Daily Tasks </div>
      </div>
    );
  }
}

export default DailyTaskScreen;
