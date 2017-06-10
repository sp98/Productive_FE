import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';

class LoginScreen extends Component {
  render() {
    return (
     <LoginForm history={this.props.history} />
    );
  }
}

export default LoginScreen;
