import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends Component {

  formSubmit(values) {
    console.log(values);
  }

  renderInputField(field) {
    //console.log(field);
    const { meta: { touched, error }, placeholder, type } = field;
    return (
      <div>
      <input
       {...field.input}
       placeholder={placeholder}
       type={type}
      />
      <div className='text-help'>
       {touched ? error : ''}
      </div>
      </div>
    );
  }

  render() {
  //console.log(this.props);
  const { handleSubmit, submitting, pristine } = this.props;
    return (
      <div>
       <h1> Login </h1>
       <form onSubmit={handleSubmit(this.formSubmit)} >
         <Field
           name='email'
           placeholder='Enter Email'
           type='text'
           component={this.renderInputField}
         />

         <Field
           name='password'
           placeholder='Enter Password'
           component={this.renderInputField}
           type='password'
         />

         <button className='btn btn-primary' disabled={submitting || pristine}> Login </button>
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

 return errors;
};

export default reduxForm({
validate,
form: 'LoginForm',
})(LoginForm);
