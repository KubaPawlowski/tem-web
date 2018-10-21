import React, { Component } from 'react';
import { database, firebase } from '../../firebase';
import { IconButton } from '../common';
import ListView from '../common/ListView';
import SingleNotification from './SingleNotification';
import { NotificationsBox, NotificationCounter } from '.';
import { REQUEST_TYPE, REQUEST_STATUS } from '../../constants/requests';

class Notifications extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth;
    this.currentUser = currentUser.uid;
    this.state = {
      visible: false,
      dataSource: [],
      countNotReaded: 0,
    };
    this.listItem = item => (
      <React.Fragment>
        <SingleNotification data={item} />
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.fetchNotifications();
  }

  fetchNotifications() {
    database.doFetch(`users/${this.currentUser}/notifications`).on(
      'value',
      (snapshot) => {
        let countNotReaded = 0;
        const dataSource = [];
        if (snapshot.val() !== null) {
          snapshot.forEach((child) => {
            const data = child.val();
            data.notificationKey = child.key;
            dataSource.push(data);
            if (child.val().readed === false) {
              countNotReaded += 1;
            }
          });
          this.setState({
            dataSource,
            countNotReaded,
          });
        }
      },
    );
  }

  toggleNotifications() {
    const { visible } = this.state;
    this.setState({
      visible: !visible,
    });
  }

  renderNotifications() {
    const { visible, dataSource } = this.state;
    console.log(dataSource)
    return visible
      ? (
        <NotificationsBox>
          <ListView dataSource={dataSource} render={this.listItem} />
        </NotificationsBox>
      )
      : null;
  }

  render() {
    const { countNotReaded } = this.state;
    return (
      <React.Fragment>
        <div style={{ width: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <IconButton iconPath={require('../../assets/bell_g.svg')} size={24} onPress={() => this.toggleNotifications()} />
          <NotificationCounter count={countNotReaded} />
          {this.renderNotifications()}
        </div>

      </React.Fragment>
    );
  }
}

export default Notifications;
