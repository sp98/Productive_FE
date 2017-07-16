import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { userLogin, showNotification, hideNotifications } from '../actions';
import { NotifyError } from './Notifications';

const today = moment().format('YYYY-MM-DD');

class LoginForm extends Component {

 onSuccessfullLogin() {
   const { data } = this.props.authCreds;
   if (data !== 'Invalid email or password') {
     console.log(this.props.authCreds.data.token);
     localStorage.setItem('token', data.token);
     localStorage.setItem('user_id', data.user_id);
     this.props.hideNotifications();
     this.props.history.push({
       pathname: `${localStorage.getItem('user_id')}/Daily/${today}`,
       state: {
         selectedDate: today,
         cadence: 'Daily'
       } });
   } else {
     this.props.showNotification(true, 'Error', data);
   }
 }

 formSubmit(values) {
   //console.log(`form sumbitted with ${values}`);
   this.props.userLogin(values, () => {
     this.onSuccessfullLogin();
   });
 }


  renderInputField(field) {
    const { meta: { touched, error }, placeholder, type } = field;
    return (
      <div >
      <input
       {...field.input}
       placeholder={placeholder}
       type={type}
       style={styles.loginFormFieldStyles}
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
  const { loginFormStyles, loginTitle, loginButtonStyles } = styles;
    return (
      <div style={loginFormStyles}>
      <div style={loginTitle}> Login </div>
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

      <div>
      <button
      style={loginButtonStyles}
      className='btn btn-primary' disabled={submitting || pristine}
      >
      Login </button>
      </div>
       </form>
       { this.props.notify.display === true ?
         <NotifyError
          title={this.props.notify.type}
          message={this.props.notify.message}
          onCancel={() => this.props.hideNotifications()}
         />
         : '' }
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
     errors.email = 'Invalid Email Format (Trye abc@xyz.com)';
   }
 }

 if (!values.password) {
   errors.password = 'Please enter password';
 }

 return errors;
};


const styles = {
  loginFormStyles: {
  display: 'flex',
  backgroundColor: 'powderblue',
  borderRadius: '5px',
  width: '450px',
  flexDirection: 'column',
  alignItems: 'center',
  },

  loginTitle: {
    flex: 1,
    fontSize: '20px',
    padding: '20px 20px 0',
    margin: 0,
  },

  loginFormFieldStyles: {
    flex: 1,
    color: '#ffff',
    padding: '20px 20px 0',
    margin: '20px 20px 0',
    borderRadius: '6px',
    width: '300px',
  },

  loginButtonStyles: {
  flex: 1,
  width: '300px',
  padding: '10px 10px 10px',
  margin: '20px 20px 50px',
  fontSize: '20px',
  borderRadius: '6px',
  }
};

const mapStateToProps = state => {
  return {
     authCreds: state.authCreds,
     notify: state.notify
     };
};

const mapDispatchToProps = (dispatch) => {
  //sending the action creator results to all the reducers using dispatch function
  return bindActionCreators({ userLogin, showNotification, hideNotifications }, dispatch);
};

export default reduxForm({
 validate,
 form: 'LoginForm',
})(
  connect(mapStateToProps, mapDispatchToProps)(LoginForm)
);
