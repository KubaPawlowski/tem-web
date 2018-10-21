import React, { Component } from 'react';
import { firebase, database } from '../../firebase';
import ListView from '../common/ListView';

class FriendsList extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth;
    this.currentUser = currentUser.uid;
    this.state = {
      dataSource: [],
    };
    this.listItem = (item) => {
      console.log(item)
      return (
        <React.Fragment>
          <div>{item.fullname}</div>
        </React.Fragment>
      );
    };
  }

  componentDidMount() {
    this.fetchList();
  }

  fetchList() {
    database.doFetch(`users/${this.currentUser}/friends`).once(
      'value',
      (snapshot) => {
        const dataSource = [];
        snapshot.forEach((child) => {
          let userData = {};
          database.doFetch(`users/${child.key}/user-data`).once(
            'value',
            (snapshot2) => {
              snapshot2.forEach((child2) => {
                userData[child2.key] = child2.val();
              });
            },
          );
          dataSource.push(userData);
        });
        this.setState({
          dataSource,
        });
      },
    );
  }

  render() {
    const { dataSource } = this.state;
    console.log(dataSource)
    return (
      <div>
        <ListView dataSource={dataSource} render={this.listItem} />
      </div>

    );
  }
}

export default FriendsList;
