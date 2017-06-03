import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class WelcomeScreen extends Component {
  render() {
    return (
      <div>
        <Link className='btn btn-primary' to='/login'> Login </Link>
        <Link className='btn btn-primary' to='/signup'> Sign Up </Link>
        <h1>
         Welcome Screen
        </h1>
       </div>
    );
  }
}

export default WelcomeScreen;
