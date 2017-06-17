import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HistoryView, Calendar } from 'react-date-picker';
import moment from 'moment';
import { connect } from 'react-redux';

import { fetchTasks, emptySelectedTasks } from '../actions';
import Header from '../components/Header';
import TaskItem from '../components/TaskItem';
import DeleteTasks from '../components/DeleteTasks';

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
    return (
      <div>
      <div>
        <Header history={this.props.history} />
      </div>

       <div className="row">
         <div className="col-md-4">
           <h2 className="daily_header text-xs-center">
           {cadence} Tasks
           </h2>
         </div>
         <div className="col-md-4 text-xs-right" >
           <Link className="btn btn-primary " to="/new"> New </Link>
         </div>
         <div className="col-md-4 text-xs-right" >
           <DeleteTasks
           cadence="Daily"
           selectedDate={selectedDate}
           user_id={localStorage.getItem('user_id')}
           />
         </div>
       </div>

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

      </div>
    );
  }
}

const styles = {
  datePickerStyle: {
    backgroundColor: 'blue'
  }
};

const mapStateToProps = state => {
  //console.log('Inside map state to props in Daily Task Screen');
  return { tasks: state.tasks, selectedTasks: state.selectedTasks };
};
export default connect(mapStateToProps, { fetchTasks, emptySelectedTasks })(TaskScreen);
