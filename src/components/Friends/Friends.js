import React, { Component } from 'react';
import InviteFriends from './InviteFriends';
import FriendsList from './FriendsList';
import { RoundedContainer } from '../common';

class Friends extends Component {
  render() {
    return (
      <RoundedContainer>
        <InviteFriends />
        <FriendsList />
      </RoundedContainer>
    );
  }
}

export default Friends;
