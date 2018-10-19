import React, { Component } from 'react';

import { database, firebase } from '../../firebase';
import { RoundedContainer, Spinner, NoData } from '../common';
import { Chart } from '.';
import DayPicker from '../common/DayPicker';
import { time } from '../../functions';


class Daily extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth;
    this.currentUser = currentUser.uid;
    this.state = {
      dataSource: [],
      date: time.getCurrentDate(),
      loading: false,
    };
  }

  componentDidMount() {
    this.getDayEditingTime();
  }

  getDayEditingTime() {
    const { date } = this.state;
    this.setState({
      loading: true,
    });
    database.doFetch(`users/${this.currentUser}/userTopics`).on(
      'value',
      (snapshot) => {
        const data = [];
        snapshot.forEach((child) => {
          const editingTime = [];
          database.doFetch(`users/${this.currentUser}/userTopics/${child.key}/edits/${date}/${this.currentUser}/single-edits`).on(
            'value',
            (snapshot2) => {
              if (snapshot2.val() !== null) {
                snapshot2.forEach((item) => {
                  editingTime.push(item.val());
                });
              }
            },
          );
          if (editingTime.length > 0) {
            data.unshift({
              name: child.val().name,
              description: child.val().description,
              topicKey: child.key,
              color: child.val().color, // hex
              editingTime, // seconds
            });
          }
        });
        this.setState({
          dataSource: data,
          loading: false,
        });
      },
    );
  }

  changeDay = (date) => {
    this.setState(
      {
        date,
      },
      () => this.getDayEditingTime(),
    );
  }

  renderChart() {
    const { dataSource, loading } = this.state;
    console.log(typeof (dataSource))
    if (loading) {
      return <center><Spinner size={50} /></center>;
    }
    if (!loading && dataSource.length > 0) {
      return <Chart data={dataSource} />;
    }
    return <NoData>No data for this day</NoData>;
  }

  render() {
    return (
      <RoundedContainer>
        <DayPicker onChange={this.changeDay} />
        {this.renderChart()}
      </RoundedContainer>
    );
  }
}

export default Daily;
