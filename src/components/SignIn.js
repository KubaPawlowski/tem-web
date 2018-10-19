import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { auth } from '../firebase';
import * as routes from '../constants/routes';
import { Button, InputField, MainContainer } from './common';
import DevLoginButton from './common/DevLoginButton';
import * as CS from '../constants/colors';

const SignInPage = ({ history }) => {
  return (
    <MainContainer>
      <div style={styles.formContainer}>
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <img style={{ width: 50}} src={require('../assets/tem-small.png')} alt='logo'/>
          <div style={{ fontSize: 39, textTransform: 'uppercase', paddingLeft: 10}}>Sign In</div>
        </div>
        <SignInForm history={history} />
        <SignUpLink />

        <DevLoginButton />
      </div>
    </MainContainer>
  );
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });


  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit} style={{display: 'flex', flexDirection: 'column'}}>
        <div className="inputLabel">Email</div>

        <InputField
          value={email}
          onChange={(event) => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <div className="inputLabel">Password</div>

        <InputField
          value={password}
          onChange={(event) => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <div style={{ paddingTop: 20 }}>
          <Button disabled={isInvalid} type="submit">
            Sign in
          </Button>
        </div>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const styles = {
  formContainer: {
    height: '60vh',
    width: 300,
    marginTop: '15vh',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 10,
    backgroundColor: CS.SecondaryColor
  }
}

export default withRouter(SignInPage);
