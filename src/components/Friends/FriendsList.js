import React, { Component } from 'react';
import { firebase, database } from '../../firebase';
import ListView from '../common/ListView';

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
    };
    this.listItem = (item) => {
      return (
        <React.Fragment>
          <div>{item.userUid}</div>
        </React.Fragment>
      );
    };
  }

  componentDidMount() {
    this.fetchList();
  }

  fetchList() {
    database.doFetch('users').on(
      'value',
      (snapshot) => {
        console.log(snapshot.val())
      }
    );
  }

  render() {
    const { dataSource } = this.state;
    return (
      <ListView dataSource={dataSource} render={this.listItem} />
    );
  }
}

export default FriendsList;
