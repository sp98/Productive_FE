import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { userLogin } from '../actions';

class LoginForm extends Component {

   componentWillReceiveProps() {

   }

  formSubmit(values) {
    //console.log(`form sumbitted with ${values}`);
    this.props.userLogin(values);
    if (this.props.authCreds) {
      console.log(this.props.authCreds.data.token);
      localStorage.setItem('token', this.props.authCreds.data.token);
      localStorage.setItem('user_id', this.props.authCreds.data.user_id);
      const today = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
      this.props.history.push(`${localStorage.getItem('user_id')}/daily/${today}`);
    }
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
       <form onSubmit={handleSubmit(this.formSubmit.bind(this))} >
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

//client side validation of the form
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

 return errors;
};


const mapStateToProps = state => {
  return {
     authCreds: state.authCreds
     };
};

const mapDispatchToProps = (dispatch) => {
  //sending the action creator results to all the reducers using dispatch function
  return bindActionCreators({ userLogin }, dispatch);
};

export default reduxForm({
 validate,
 form: 'LoginForm',
})(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
