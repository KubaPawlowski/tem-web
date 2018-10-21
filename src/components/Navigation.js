import React, { Component } from 'react';
import { NavLink } from './common';

import * as routes from '../constants/routes';
import * as CS from '../index.css';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };
  }

  onToggle() {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  }

  toggleNavigation() {
    const { visible } = this.state;
    if (visible) {
      return (
        <div style={styles.container}>
          <NavLink to={routes.HOME} title="home" icon={require('../assets/home_w.svg')} />
          <NavLink to={routes.ACCOUNT} title="account" icon={require('../assets/profile_w.svg')} />
          <NavLink to={routes.STATISTICS} title="statistics" icon={require('../assets/stats_w.svg')} />
          <NavLink to={routes.SIGN_OUT} title="log out" icon={require('../assets/logout_w.svg')} />
          <NavLink to={routes.TEST} title="test" icon={require('../assets/logout_w.svg')} />
        </div>
      );
    }
    return null;
  }

  render() {
    const { hideButton, buttonHidden } = styles;
    const { visible } = this.state;
    return (
      <React.Fragment>
        {this.toggleNavigation()}
        <div style={visible ? hideButton : buttonHidden } onClick={() => { this.onToggle(); }}>
          《
        </div>
      </React.Fragment>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: CS.PrimaryColor,
  },
  hideButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: 8,
    backgroundColor: CS.PrimaryColor,
    borderLeftStyle: 'dashed',
    borderLeftWidth: 1,
    borderLeftColor: CS.PrimaryBrighter,
  },
  buttonHidden: {
    width: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: CS.PrimaryColor,
  },
};

export default Navigation;
