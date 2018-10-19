import React, { Component } from 'react';
import Navigation from '../Navigation';
import SearchBar from '../SearchBar';
import { firebase } from '../../firebase';
import { Content } from './Content';
import * as CS from '../../index.css';
import { Loading } from '.';

class AuthorizedContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged((authUser) => {
      authUser ? setTimeout(() => this.setState({ authUser }), 250) : this.setState({ authUser: null });
    });
  }

  renderContent() {
    const { children } = this.props;
    const { authUser } = this.state;
    if (authUser) {
      return (
        <React.Fragment>
          <Navigation />
          <div style={{ display: 'flex', flexDirection: 'column', flex: 5 }}>
            <SearchBar />
            <Content>
              {children}
            </Content>
          </div>
        </React.Fragment>
      );
    }
    return (
      <Loading />
    );
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          backgroundColor: CS.SecondaryColor,
        }}
      >
        {this.renderContent()}
      </div>
    );
  }
}

export default AuthorizedContent;
