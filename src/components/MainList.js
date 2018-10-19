import React, { Component } from 'react';
import _ from 'lodash';
import { firebase, database } from '../firebase';
import ListItem from './common/ListItem';
import ListView from './common/ListView';
import CreateForm from './common/CreateForm';
import {
  BigButton,
  MainListHeader,
  RoundedContainer,
  Sort,
} from './common';

import { ACTIVE_DATA } from '../constants/initialDataStructure';

class MainList extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth;
    this.currentUser = currentUser.uid;
    this.state = {
      dataSource: [],
      activeTopic: {},
      createFormVisible: false,

      sorting: 'recent',
    };
    this.listItem = (item) => {
      const { activeTopic } = this.state;
      return (
        <React.Fragment key={item.topicKey}>
          <ListItem data={item} isActive={activeTopic}>
            {`${item.name} - ${item.description}`}
          </ListItem>
        </React.Fragment>
      );
    };
  }

  componentDidMount() {
    this.fetchPref();
  }

  onSort() {
    const { sorting } = this.state;
    let { value } = this.state;
    switch (sorting) {
      case 'recent':
        value = 'alphabetical';
        break;
      case 'alphabetical':
        value = 'last_added';
        break;
      default:
        value = 'recent';
    }
    this.setState({
      sorting: value,
    }, () => { this.fetchList(); this.updatePrefs({ mainListSorting: value }); });
  }

  updatePrefs(pref) {
    database.doFetch(`users/${this.currentUser}/prefs`).update(pref).then(() => this.fetchPref());
  }

  fetchPref() {

    database.doFetch(`users/${this.currentUser}/prefs`).on(
      'value',
      (snapshot) => {
        this.setState({
          sorting: snapshot.val() === null ? 'alphabetical' : snapshot.val().mainListSorting,
        }, () => this.fetchList());
      },
    );
  }

  fetchList() {
    database.doFetch(`users/${this.currentUser}/activeTopic`).on(
      'value',
      (snapshot) => {
        let activeTopic = {};

        if (snapshot.val() === null) {
          activeTopic = ACTIVE_DATA;
        } else {
          snapshot.forEach((child) => {
            activeTopic[child.key] = child.val();
          });
        }
        this.setState({
          activeTopic,
        });
      },
    );
    database.doFetch(`users/${this.currentUser}/userTopics`).on(
      'value',
      (snapshot) => {
        const data = [];
        snapshot.forEach((child) => {
          let time;
          if (typeof (child.val().edits) !== 'undefined') {
            const allEdits = Object.values(child.val().edits);
            const keyCount = Object.keys(child.val().edits).length;
            const lastEdit = allEdits[keyCount - 1];
            time = lastEdit[this.currentUser].startTime;
          } else {
            time = 0;
          }

          data.unshift({
            name: child.val().name,
            description: child.val().description,
            topicKey: child.key,
            color: child.val().color,

            lastEdit: time,
          });
        });

        const sortedData = this.applySorting(data);

        this.setState({
          dataSource: sortedData,
        });
      },
    );
  }

  applySorting(input) {
    const { sorting } = this.state;
    let output;
    switch (sorting) {
      case 'alphabetical':
        output = _.orderBy(input, [user => user.name.toLowerCase()]);
        break;
      case 'recent':
        output = _.orderBy(input, ['lastEdit'], ['desc']);
        break;
      default:
        output = input;
        break;
    }
    return output;
  }

  render() {
    const { dataSource, createFormVisible, sorting } = this.state;
    return (
      <RoundedContainer>
        <MainListHeader>
          <BigButton title="Add Project" onPress={() => { this.setState({ createFormVisible: true }); }} />
          <Sort onChange={() => this.onSort()} value={sorting} />
        </MainListHeader>
        { createFormVisible
          ? <CreateForm onDiscard={() => this.setState({ createFormVisible: false })} />
          : null
        }
        <ListView dataSource={dataSource} render={this.listItem} />
      </RoundedContainer>
    );
  }
}

export default MainList;
