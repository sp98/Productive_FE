import React from 'react';
import { Field, reduxForm } from 'redux-form';
import moment from 'moment';
import { DateField, DatePicker } from 'react-date-picker';
import { connect } from 'react-redux';

import { createTask } from '../actions'

class CreateTaskForm extends React.Component {

  onCreateSubmit(values) {

    const userID = localStorage.getItem('user_id');
    const today = moment().format('YYYY-MM-DD');
    this.props.createTask(userID, values,
    () => {
      this.props.history.push(`${userID}/daily/${today}`);
    });
  }

  renderInputField(field) {
    console.log(field);
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
  }

  renderSelectField(field) {
    const { meta: { touched, error } } = field;
    return (
      <div>
      <select {...field.input} >
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
    console.log(this.props);
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
        />

        </div>

        <div>
        <Field
        name='taskDate'
        placeholder='Select Date'
        component={this.renderDatePickerField}
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
  form: 'CreateTaskForm'
})(connect(null, { createTask })(CreateTaskForm));
