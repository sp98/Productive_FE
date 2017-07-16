import React from 'react';
import { connect } from 'react-redux';
import { deleteTasks, fetchTasks, emptySelectedTasks, showModals } from '../actions';
import Confirm from '../modals/Confirmation';

class DeleteTasks extends React.Component {

  onDeletePress() {
    const toBeDeleted = this.props.selectedTasks;
    if (toBeDeleted.length < 1) {
      console.log('show model here');
      this.props.showModals('CONFIRM_POPUP');
    } else {
      console.log(`about to delete ${JSON.stringify(toBeDeleted)}`);
      this.props.deleteTasks(toBeDeleted, () => {
         this.props.fetchTasks(this.props.user_id, this.props.selectedDate, this.props.cadence);
         this.props.emptySelectedTasks();
      });
    }
  }

  render() {
    return (
       <button className="btn btn-primary" onClick={() => this.onDeletePress()}> Delete </button>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(`Selected States in mapStateToProps ${JSON.stringify(state.selectedTasks)}`);
  return { selectedTasks: state.selectedTasks };
};

export default connect(mapStateToProps,
  { deleteTasks, fetchTasks, emptySelectedTasks, showModals })(DeleteTasks);
