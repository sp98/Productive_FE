import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';

class SignUpform extends Component {

formSubmit(values) {
  const ROOT_URL = 'http://127.0.0.1:8000/api/v1/';
  const endPoints = 'user/create/';
  console.log(values);
  axios.post(`${ROOT_URL}${endPoints}`, values);
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
      <div className='text-help'>
      { touched ? error : ''}
      </div>
    </div>
  );
}
 render() {
   const { handleSubmit, submitting, pristine, reset } = this.props;
   return (
    <div>
      <h1> Sign Up </h1>
      <form onSubmit={handleSubmit(this.formSubmit)}>

      <Field
      name='email'
      component={this.renderInputField}
      placeholder='Enter Email'
      type='text'
      />

      <Field
      name='userName'
      component={this.renderInputField}
      placeholder='Enter UserName'
      type='text'
      />

      <Field
      name='password'
      component={this.renderInputField}
      placeholder='Enter Password'
      type='password'
      />

      <Field
      name='retypePassword'
      component={this.renderInputField}
      placeholder='Retype Password'
      type='password'
      />

     <button className='btn btn-primary' disabled={submitting || pristine} > Sign Up </button>
     <button
     className='btn btn-primary' disabled={submitting || pristine}
     onClick={reset}
     >
     Clear
    </button>
      </form>
    </div>
   );
 }

}

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Please enter email';
  }

  if (!values.password) {
    errors.password = 'Please enter password';
  }

  if (!values.retypePassword) {
    errors.retypePassword = 'Please retype the above password';
  }

  if (values.password && values.retypePassword) {
     if (values.password !== values.retypePassword) {
       errors.retypePassword = 'Passords Not matching';
     }
  }

 if (!values.userName) {
    errors.userName = 'Please Enter User Name';
 }
  return errors;
};

export default reduxForm({
  validate,
  form: 'SignUpForm'
})(SignUpform);
