import React, { Component } from 'react';
import {
  Link,
  withRouter
} from 'react-router-dom';

import { auth, database } from '../firebase';
import * as routes from '../constants/routes';
import { USER_DATA } from '../constants/initialDataStructure';

const SignUpPage = ({ history }) => {
  return (
    <div>
      <h1>Sign Up Page</h1>
      <SignUpForm history={history}/>
    </div>
  );
}

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const {
      username,
      email,
      passwordOne
    } = this.state;

    const { history } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((user) => {
        const currentUser = user.user.uid;
        const ref = database.doFetch(`users/${currentUser}/user-data`);
        ref.update(USER_DATA);
        ref.update({ fullname: username, email });
        this.setState({ ...INITIAL_STATE }, () => { console.log(this.state.username); });
        history.push(routes.HOME);
      })
      .catch((error) => {
        this.setState(byPropKey('error', error));
      });
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';



    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={username}
          onChange={(event) => { this.setState(byPropKey('username', event.target.value)); }}
          type="text"
          placeholder="Full Name"
        />
        <input
          value={email}
          onChange={(event) => { this.setState(byPropKey('email', event.target.value)); }}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={passwordOne}
          onChange={(event) => { this.setState(byPropKey('passwordOne', event.target.value)); }}
          type="password"
          placeholder="Password"
        />
        <input
          value={passwordTwo}
          onChange={(event) => { this.setState(byPropKey('passwordTwo', event.target.value)); }}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () => {
  return (
    <p>
      Dont have an account?
      {' '}
      <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>
  );
}

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink
};
