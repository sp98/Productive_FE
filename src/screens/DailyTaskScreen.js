import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { DateField, Calendar } from 'react-date-picker'
import moment from 'moment';
import { connect } from 'react-redux';

import { fetchTasks } from '../actions'
import Header from '../components/Header';

class DailyTaskScreen extends Component {

  componentDidMount() {
    console.log(moment());
    console.log(moment().format('dddd'));
    console.log(moment().format('MMMM'));
    console.log(moment().year());
    console.log(moment().week());
    console.log(moment().format('YYYY-MM-DD'));
    const today = moment().format('YYYY-MM-DD');
    const userID = localStorage.getItem('user_id');
    this.props.fetchTasks(userID, today);
    console.log(this.props.tasks);
  }
  onDateChange() {

  }

  renderTasks() {
    console.log(`rendered with ${this.props.tasks.data}`);
    if (this.props.tasks.data) {
      this.props.tasks.data.map(task => {
        return (
          <li className="list-group-item">
          {task.taskName}
          </li>
        );
      });
    }
  }
  render() {
    console.log(`rendering with ${this.props.tasks.data}`);
    return (
      <div>

      <div>
        <Header history={this.props.history} />
      </div>

       <div className="row">
         <div className="col-md-4">
           <h2 className="daily_header text-xs-center"> Daily Tasks </h2>
         </div>
         <div className="col-md-4 text-xs-right" >
           <Link className="btn btn-primary " to="/new"> New </Link>
         </div>
       </div>

       <div className="row">
          <div className="col-sm-4">
              <Calendar
                dateFormat="YYYY-MM-DD"
                date={moment()}
              />
         </div>

         <div className="col-sm-6">
         <h3>Tasks</h3>
         <ul className="list-group">
           {this.props.tasks.data ? this.props.tasks.data.map((task) => {
             return (
               <li className="list-group-item" key={task.id}>
               {task.taskName}
               </li>
             );
           }) : ''}
         </ul>
         </div>
       </div>

      </div>
    );
  }
}

const mapStateToProps = state => {
  return { tasks: state.tasks };
};
export default connect(mapStateToProps, { fetchTasks })(DailyTaskScreen);
