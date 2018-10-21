import React, { Component } from 'react';
import { firebase, database } from '../../firebase';
import ListView from '../common/ListView';
import { IconButton, InputField, UserMessageContainer, ErrorContainer } from '../common';

import { REQUEST_TYPE, REQUEST_STATUS } from '../../constants/requests';

class InviteFriends extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth;
    this.currentUser = currentUser.uid;
    this.state = {
      emailToInvite: '',
      error: '',
      message: '',
    };
  }

  onChange(value) {
    this.setState({
      emailToInvite: value,
      error: '',
    });
  }

  onSubmit() {
    let error;
    let message;
    const match = this.checkUsers();
    if (match !== null && match.uid !== this.currentUser) {
      const isFriend = this.isFriend(match);
      if (isFriend === false) {
        this.createFriend(match);
        message = 'Invitation sent';
      } else {
        isFriend === REQUEST_STATUS.waiting
          ? error = 'You have already sent invitation to that user'
          : error = 'You are already connected with this user';
      }
    } else if (match !== null && match.uid === this.currentUser) {
      error = 'You can not invite yourself ;)';
    } else {
      error = 'There is no user with provided email';
    }
    this.setState({
      emailToInvite: '',
      error,
      message,
    });
  }

  createFriend(data) {
    // set friend in user base
    database.doFetch(`users/${this.currentUser}/friends/${data.uid}`)
      .set({ status: REQUEST_STATUS.waiting });
    // set request on another user base
    const requestBody = {
      type: REQUEST_TYPE.friends,
      status: REQUEST_STATUS.waiting,
      readed: false,
      sender: this.currentUser,
    };
    database.doFetch(`users/${data.uid}/notifications`)
      .push(requestBody)
      .catch((error) => { console.log(error); });
  }

  checkUsers() {
    const { emailToInvite } = this.state;
    let match = null;
    database.doFetch('users').on(
      'value',
      (snapshot) => {
        snapshot.forEach((child) => {
          database.doFetch(`users/${child.key}/user-data`).on(
            'value',
            (snapshot2) => {
              const fetchedEmail = snapshot2.val().email;
              match = fetchedEmail === emailToInvite
                ? { email: fetchedEmail, uid: child.key }
                : match;
            },
          );
        });
      },
    );
    return match;
  }

  isFriend(friendData) {
    let isFriend = false;
    database.doFetch(`users/${this.currentUser}/friends`).on(
      'value',
      (snapshot) => {
        snapshot.forEach((child) => {
          if (child.key === friendData.uid) {
            isFriend = child.val().status;
          }
        });
      },
    );
    return isFriend;
  }

  render() {
    const { error, emailToInvite, message } = this.state;
    return (
      <React.Fragment>
        <InputField onChange={event => this.onChange(event.target.value)} value={emailToInvite} />
        <IconButton iconPath={require('../../assets/correct_green.png')} size={24} onPress={() => this.onSubmit()} />
        <ErrorContainer>{error}</ErrorContainer>
        <UserMessageContainer>{message}</UserMessageContainer>
      </React.Fragment>
    );
  }
}

export default InviteFriends;
