import React, { Component } from 'react';

import { auth } from '../firebase';

class SignOutButton extends Component {
  render() {
    return (
      <div
        onClick={() => { auth.doSignOut().then(() => {console.log('wylogowena')});}}
      >
        Sign Out
      </div>
    );
  }
}

export default SignOutButton;
