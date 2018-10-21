import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import HomePage from './Home';
import AccountPage from './Account';
import StatisticsPage from './Statistics/Statistics';
import SignOut from './SignOut';
import TestPage from './TestPage';

import * as routes from '../constants/routes';
import { firebase } from '../firebase';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged((authUser) => {
      authUser ? this.setState({ authUser }) : this.setState({ authUser: null });
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Route
            exact
            path={routes.SIGN_UP}
            component={SignUpPage}
          />
          <Route
            exact
            path={routes.SIGN_IN}
            component={SignInPage}
          />
          <Route
            exact
            path={routes.PASSWORD_FORGET}
            component={PasswordForgetPage}
          />
          <Route
            exact
            path={routes.HOME}
            component={HomePage}
          />
          <Route
            exact
            path={routes.ACCOUNT}
            component={AccountPage}
          />
          <Route
            exact
            path={routes.STATISTICS}
            component={StatisticsPage}
          />
          <Route
            exact
            path={routes.SIGN_OUT}
            component={SignOut}
          />
          <Route
            exact
            path={routes.TEST}
            component={TestPage}
          />
        </div>
      </Router>
    );
  }
}

export default App;
