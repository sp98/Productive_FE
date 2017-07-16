import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HistoryView, Calendar } from 'react-date-picker';
import moment from 'moment';
import { connect } from 'react-redux';

import { fetchTasks, emptySelectedTasks, hideNotifications, showModals } from '../actions';
import Header from '../components/Header';
import TaskItem from '../components/TaskItem';
import DeleteTasks from '../components/DeleteTasks';
import { NotifySuccess, NotifyError } from '../components/Notifications';
import ModalConductor from '../modals/ModalConductor';

class TaskScreen extends Component {

  state = { selectedDate: moment().format('YYYY-MM-DD') };

  componentDidMount() {
    const { cadence, selectedDate } = this.props.location.state;
    //console.log(`component did mount with props - ${JSON.stringify(this.props)}`);
    this.getTasks(localStorage.getItem('user_id'), selectedDate, cadence);
  }

   getTasks(userID, date, cadence) {
    this.props.fetchTasks(userID, date, cadence, () => {
      this.props.history.push({
        pathname: `/${userID}/${cadence}/${date}`,
        state: {
          selectedDate: date,
          cadence
        }
      });
    });
  }

  getNotifications() {
   const { notify } = this.props;
   console.log(notify);
   if (notify.display === true && notify.type === 'Success') {
     console.log('show Notifications');
     return (
       <NotifySuccess
        message={notify.message}
        onCancel={() => this.props.hideNotifications()}
       />
     );
   }
  }

  renderDatePicker() {
    const { cadence, selectedDate } = this.props.location.state;
    if (cadence === 'Daily') {
      return (
        <Calendar
          style={styles.datePickerStyle}
          dateFormat="YYYY-MM-DD"
          date={selectedDate}
          max={moment()}
          onChange={(selection) => {
            console.log(`user has selected ${selection}`);
            this.getTasks(localStorage.getItem('user_id'), selection, 'Daily');
            this.props.emptySelectedTasks();  // empty the selected Tasks reducer
          }}
        />
      );
    } else if (cadence === 'Monthly') {
      return (
        < HistoryView
         dateFormat="YYYY-MM"
         date={selectedDate}
         onChange={(selection) => {
           console.log(`user has selected ${selection}`);
           this.getTasks(localStorage.getItem('user_id'), selection, 'Monthly');
           this.props.emptySelectedTasks();  // empty the selected Tasks reducer
         }}
        />
      );
    } else if (cadence === 'Weekly') {
      return (
        <Calendar
          style={styles.datePickerStyle}
          dateFormat="YYYY-MM-DD"
          onChange={(selection) => {
            const yearWeek = `${moment(selection).year()}-${moment(selection).week()}`
            this.setState({ selectedDate: selection });
            this.getTasks(localStorage.getItem('user_id'), yearWeek, 'Weekly');
            this.props.emptySelectedTasks();  // empty the selected Tasks reducer
          }}
        />
      );
    }
  }

  renderTaskDate() {
    const { cadence, selectedDate } = this.props.location.state;
    if (cadence === 'Daily') {
      return moment(selectedDate).format('MMM Do, YYYY');
    } else if (cadence === 'Monthly') {
      return moment(selectedDate).format('MMMM YYYY');
    } else if (cadence === 'Weekly') {
      const year = selectedDate.split('-')[0];
      const weekNumber = selectedDate.split('-')[1];

      const startDate = moment().year(year).isoWeek(weekNumber).startOf('week')
                       .format('MMM Do, YYYY');
      const endDate = moment().year(year).isoWeek(weekNumber).endOf('week')
                       .format('MMM Do, YYYY');
      return `${startDate} - ${endDate}`;
  }
}

  render() {
    //console.log(`Rendering Daily Task Screen with data ---> ${this.props.tasks.data}`);
    const { cadence, selectedDate } = this.props.location.state;
    const { taskScreenStyle,
            taskHeaderStyle,
            taskHeaderButtonAlignmentStyle,
            taskHeaderTitleStyle } = styles;

    return (
      <div>
        <div style={taskScreenStyle}>
          <ModalConductor {...this.props} />

          <div>
            <Header history={this.props.history} />
          </div>

          {/* Task Title and Buttons */}
           <div style={taskHeaderStyle}>

             <h4 style={taskHeaderTitleStyle}>
               {cadence} Tasks
             </h4>

             <div style={taskHeaderButtonAlignmentStyle}>
               <Link className="btn btn-primary " to="/new"> New </Link>
               <DeleteTasks
               cadence="Daily"
               selectedDate={selectedDate}
               user_id={localStorage.getItem('user_id')}
               />
             </div>
           </div>
           {/* Task title and Buttons ends here */}

           <div className="row">
              <div className="col-sm-4">
                  {this.renderDatePicker()}
             </div>


             <div className="col-sm-6">
             <h4>{this.renderTaskDate()}</h4>
             <ul className="list-group">
              {this.props.tasks.data ? this.props.tasks.data.map((task) => {
               return (
                   <TaskItem task={task} key={task.id} />
                   );
                 }) : ''}
             </ul>
             </div>
           </div>

           { this.props.notify.display === true ?
             <NotifySuccess
              title={this.props.notify.type}
              message={this.props.notify.message}
              onCancel={() => this.props.hideNotifications()}
             />
             : '' }
      </div>
    </div>
    );
  }
}

const styles = {
  taskScreenStyle: {
    display: 'flex',
    flexDirection: 'column',
    zIndex: '999',
    position: 'relative',

  },

  taskHeaderStyle: {
   display: 'flex',
   marginTop: '10px',
   flexDirection: 'row',
  },

  taskHeaderTitleStyle: {
    flex: 1
  },

  taskHeaderButtonAlignmentStyle: {
    flex: 1,
  },

  datePickerStyle: {
    backgroundColor: 'blue'

  }
};

const mapStateToProps = state => {
  return { tasks: state.tasks,
           selectedTasks: state.selectedTasks,
           notify: state.notify,
           currentModal: state.currentModal };
};
export default connect(mapStateToProps,
  { fetchTasks,
    emptySelectedTasks,
    hideNotifications,
    showModals })(TaskScreen);
