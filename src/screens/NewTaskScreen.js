import React from 'react';
import CreateTaskForm from '../components/CreateTaskForm';


class NewTaskScreen extends React.Component {
  render() {
    return (
      <CreateTaskForm history={this.props.history} />
    );
  }
}
export default NewTaskScreen;
