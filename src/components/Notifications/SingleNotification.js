import React, { Component } from 'react';
import { database, firebase, userInfo } from '../../firebase';
import { IconButton } from '../common';
import { SingleNotificationContainer } from '.';
import { REQUEST_TYPE, REQUEST_STATUS } from '../../constants/requests';

class SingleNotification extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth;
    this.currentUser = currentUser.uid;
    const { data } = this.props;
    this.data = data;
    this.state = {
      decided: data.status !== REQUEST_STATUS.waiting,
      readed: data.readed,
      senderName: '',
    };
  }

  componentDidMount() {
    const { data } = this.props;
    database.doFetch(`users/${data.sender}/user-data`).once(
      'value',
      (snapshot) => {
        this.setState({
          senderName: snapshot.val().fullname,
        });
      },
    );
  }
  // need to export to Friend component

  onAccept() {
    this.createFriend();
    this.onNotificationReaded();
    this.setState({
      decided: true,
    });
  }

  onReject() {
    this.rejectFriend();
    this.onNotificationReaded();
    this.setState({
      decided: true,
    });
  }

  onNotificationReaded() {
    const { notificationKey } = this.data;
    database.doFetch(`users/${this.currentUser}/notifications/${notificationKey}`)
      .update({ readed: true, status: REQUEST_STATUS.accepted });
    this.setState({
      readed: true,
    });
  }

  friendNotification() {
    const { senderName, readed, decided } = this.state;
    return (
      <SingleNotificationContainer onPress={() => { this.onNotificationReaded(); }} readed={readed}>
        <div style={{ fontWeight: 400, paddingRight: 3 }}>{senderName}</div>

        {' is asking you to become friends'}
        {decided
          ? null
          : (
            <React.Fragment>
              <IconButton iconPath={require('../../assets/correct_green.png')} size={16} onPress={() => this.onAccept()} />
              <IconButton iconPath={require('../../assets/cancel_red.png')} size={16} onPress={() => this.onReject()} />
            </React.Fragment>
          )
        }
      </SingleNotificationContainer>
    );
  }

  infoNotification() {
    const { body } = this.data;
    const { readed } = this.state;
    return (
      <SingleNotificationContainer onPress={() => { this.onNotificationReaded(); }} readed={readed}>
        {body}
      </SingleNotificationContainer>
    );
  }

  createFriend() {
    const { sender } = this.data;
    // save friend in user base
    database.doFetch(`users/${this.currentUser}/friends/${sender}`)
      .set({ status: REQUEST_STATUS.accepted });
    // change status in friend base
    database.doFetch(`users/${sender}/friends/${this.currentUser}`)
      .update({ status: REQUEST_STATUS.accepted });
    // sent return information about acceptation

    userInfo.userName().then((userName) => {
      const requestBody = {
        type: REQUEST_TYPE.return_info,
        body: `Now you are connected with user ${userName}`,
        readed: false,
        sender: this.currentUser,
      };
      database.doFetch(`users/${sender}/notifications`)
        .push(requestBody)
        .catch((error) => { console.log(error); });
    });
  }

  rejectFriend() {
    const { sender } = this.data;
    // change status in friend base
    database.doFetch(`users/${sender}/friends/${this.currentUser}`)
      .update({ status: REQUEST_STATUS.rejected });
  }

  renderNotification() {
    const { type } = this.data;
    switch (type) {
      case REQUEST_TYPE.friends:
        return this.friendNotification();
      case REQUEST_TYPE.return_info:
        return this.infoNotification();
      default:
        return null;
    }
  }

  render() {
    return (
      <div>
        {this.renderNotification()}
      </div>
    );
  }
}

export default SingleNotification;
