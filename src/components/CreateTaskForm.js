import React from 'react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import { DateField, DatePicker, HistoryView, Calendar } from 'react-date-picker';
import { connect } from 'react-redux';

import { createTask, showNotification } from '../actions';

class CreateTaskForm extends React.Component {
  state = { selectedCadence: '' };

  onCreateSubmit(values) {
    const userID = localStorage.getItem('user_id');
    if (values.taskCadence === 'Weekly') {
      values.taskDate = `${moment(values.taskDate).year()}-${moment(values.moment).week()}`;
    }
    this.props.createTask(userID, values,
    () => {
      this.props.showNotification(true, 'Success',
                                 `Added ${values.taskCadence} tasks on ${values.taskDate}`);
      this.props.history.push({
        pathname: `${userID}/${values.taskCadence}/${values.taskDate}`,
        state: {
          selectedDate: values.taskDate,
          cadence: values.taskCadence
        }
      });
    });
  }

  renderInputField(field) {
    const { meta: { touched, error }, placeholder, type } = field;
    return (
      <div>
      <input
       {...field.input}
       placeholder={placeholder}
       type={type}
      />

      <div className='help-text' >
       {touched ? error : '' }
      </div>
      </div>
    );
  }

  renderDatePickerField(field) {
  const { meta: { touched, error } } = field;

  if (this.state.selectedCadence === 'Daily') {
    return (
     <div>
     <DateField
     dateFormat="YYYY-MM-DD"
     defaultValue={moment()}
     collapseOnDateClick
     updateOnDateClick
     {...field.input}
     >
     <DatePicker
         navigation
         locale="en"
         forceValidDate
         highlightWeekends
         highlightToday
         weekNumbers
         weekStartDay={0}
     />
     </ DateField>
     <div className='help-text' >
      {touched ? error : '' }
     </div>
     </div>
    );
  } else if (this.state.selectedCadence === 'Monthly') {
    return (
      <div>
        < HistoryView
         dateFormat="YYYY-MM"
         navigation
         date={moment()}
         onChange={(selectedMonth) => console.log(selectedMonth)}
         {...field.input}
        />
        <div className='help-text' >
         {touched ? error : '' }
        </div>
      </div>
    );
  } else if (this.state.selectedCadence === 'Weekly') {
    return (
     <div>
     <DateField
     dateFormat="YYYY-MM-DD"
     collapseOnDateClick
     updateOnDateClick
     {...field.input}
     >
     <Calendar
       dateFormat="YYYY-MM-DD"
       defaultRange={[moment(Date.now()).startOf('week'), moment(Date.now()).endOf('week')]}
       onChange={(selection) => {
         console.log(moment(selection).week());
       }}
     />
     </ DateField>
     <div className='help-text' >
      {touched ? error : '' }
     </div>
     </div>
    );
  } else {
    return <div />;
  }
  }

  renderSelectField(field) {
    const { meta: { touched, error } } = field;
    return (
      <div>
      <select
      {...field.input}
      >
        <option />
        <option value="Daily"> Daily </option>
        <option value="Weekly"> Weekly </option>
        <option value="Monthly"> Monthly </option>
      </select>

      <div className='help-text' >
       {touched ? error : '' }
      </div>
      </div>
    );
  }

  render() {
    const { handleSubmit, submitting, pristine } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onCreateSubmit.bind(this))}>
        <div>
        <Field
        name='taskName'
        placeholder='Enter Tasks'
        type='text'
        component={this.renderInputField}
        />
        </div>

        <div>
        <Field
        name='taskDescription'
        placeholder='Description'
        component="textarea"
        />
        </div>

        <div>
        <Field
        name='taskCadence'
        component={this.renderSelectField}
        onChange={(event) => this.setState({ selectedCadence: event.target.value })}
        />

        </div>

        <div>
        <Field
        name='taskDate'
        placeholder='Select Date'
        component={this.renderDatePickerField.bind(this)}
        />
        </div>

        <div>
        <button className="btn btn-primary" disabled={submitting || pristine}> Create </button>
        </div>

        </form>
       </div>
    );
  }
}

const validate = (values) => {
  console.log(values);
  const errors = {};
  if (!values.taskName) {
    errors.taskName = 'Required!';
  }

  if (!values.taskCadence) {
    errors.taskCadence = 'Required!';
  }

  if (!values.taskDate) {
    errors.taskDate = 'Required!';
  }
  return errors;
};

export default reduxForm({
  validate,
  form: 'CreateTaskForm',
})(connect(null, { createTask, showNotification })(CreateTaskForm));
