import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import DjangoCSRFToken from 'django-react-csrftoken';
import axios from 'axios';

//const csrfToken = 'testString';
const ROOT_URL = 'http://127.0.0.1:8000/api/v1/';
const CREATE_USER_END_POINT = 'sign_up/';

class SignUpform extends Component {

  showAlertMessage(error) {
    //window.alert(error);
  }

//Form submition
formSubmit(values) {
  axios({
    method: 'post',
    url: `${ROOT_URL}${CREATE_USER_END_POINT}`,
    data: values,
  })
  .then((response) => console.log(response))
  .catch((error) => { this.showAlertMessage(error); });
}

//Input component for the form
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
      <DjangoCSRFToken />

      <Field
      name='email'
      component={this.renderInputField}
      placeholder='Enter Email'
      type='text'
      />

      <Field
      name='username'
      component={this.renderInputField}
      placeholder='Enter Username'
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
  } else {
    const isEmailFormat = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email);
    if (!isEmailFormat) {
      errors.email = 'Incorrect Email Format. Should be of the form abc@xyz.com';
    }
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


const asyncValidate = (values) => {
  console.log(`sending ${JSON.stringify(values)}`);
  return axios({
    method: 'post',
    url: `${ROOT_URL}user-check/`,
    data: values,
  })
  .then((response) => {
    console.log(response.data);
    if (response.data !== 'User Validated Successfully') {
      throw { username: response.data }
    }
  });
};

export default reduxForm({
  validate,
  asyncValidate,
  asyncBlurFields: ['username'],
  form: 'SignUpForm'
})(SignUpform);
