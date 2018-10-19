import React, { Component } from 'react';
import { database, firebase } from '../firebase';
import { time } from '../functions';
import { Spinner } from './common';

class Stoper extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth;
    this.currentUser = currentUser.uid;
    this.state = {
      previousEdit: 0,
      startTime: 0,
      stoperValue: 0,
    };
  }

  componentDidMount() {
    const { mode } = this.props;

    let stateData = {};
    database.checkActiveTopic(this.currentUser).then((activeData) => {
      switch (mode) {
        case 'tillnow':
          stateData = {
            startTime: activeData.startTime,
            previousEdit: 0,
          };
          break;
        case 'day':
          stateData = {
            startTime: activeData.startTime,
            previousEdit: activeData.previousEdit,
          };
          break;
        // have to add overall case
        default:
          stateData = {
            startTime: activeData.startTime,
            previousEdit: activeData.overallEditingTime,
          };
      }
    }).then(
      () => {
        this.setState(
          stateData,
          () => {
            this.timerStart();
          },
        );
      },
    );
  }

  timerStart() {
    const { previousEdit, startTime } = this.state;

    const timeNow = Date.parse(new Date()).toString();
    let startValue = previousEdit + ((timeNow - startTime) / 1000);

    setInterval(
      () => {
        ++startValue;
        const stoperValue = time.secondsToDayHourSeconds(startValue);
        this.setState({
          stoperValue,
        });
      },
      1000,
    );
  }

  renderStoper() {
    const { stoperValue } = this.state;
    const spinner = (
      <Spinner size={32} />
    );
    const stoper = (
      <React.Fragment>
        {stoperValue}
      </React.Fragment>
    );
    if (stoperValue === 0) {
      return spinner;
    }
    return stoper;
  }

  render() {
    return (
      <div>
        {this.renderStoper()}
      </div>
    );
  }
}

export default Stoper;
