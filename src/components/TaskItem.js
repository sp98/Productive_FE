import React from 'react';
import { connect } from 'react-redux';
import { selectTasks } from '../actions';

class TaskItem extends React.Component {

  taskSelected(task) {
    console.log(`user has selected the task ${JSON.stringify(task)}`);
    this.props.selectTasks(task);
  }

   render() {
     const task = this.props.task;
     //console.log(this.props);
     return (
       <li className="list-group-item">
       <input
       type='checkbox'
       onChange={() => this.taskSelected(task)}
       />
       {task.taskName}
       </li>
     );
   }
}

const mapStateToProps = (state) => {
  console.log(`Selected tasks from reducer ${JSON.stringify(state.selectedTasks)}`);
  return {
    selectedTasks: state.selectedTasks
  };
};

export default connect(mapStateToProps, { selectTasks })(TaskItem);
