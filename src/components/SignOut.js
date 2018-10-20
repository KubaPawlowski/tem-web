import React, { Component } from 'react';
import * as routes from '../constants/routes';
import { auth } from '../firebase';

class SignOutButton extends Component {
  componentDidMount() {
    auth.doSignOut();
    this.props.history.push('/');
  }
  render() {
    return (
      <div>
        Sign Out
      </div>
    );
  }
}

export default SignOutButton;
