import React, { Component } from 'react';
import { database, firebase } from '../../firebase';
import EditForm from './EditForm';
import Stoper from '../Stoper';
import {
  RollOutPanel,
  Modal,
  BigButton,
  Table,
  Column,
  ListBullet,
} from '.';

import * as CS from '../../index.css';

class ListItem extends Component {
  constructor(props) {
    super(props);
    const { data, isActive } = this.props;
    const isActiveChecked = typeof (isActive) === 'undefined' ? null : isActive;
    const { currentUser } = firebase.auth;
    this.currentUser = currentUser.uid;
    this.state = {
      timerActive: data.topicKey === isActiveChecked.activeTopicKey,
      editFormActive: false,
      topicData: data,
      activeData: {
        activeTopicKey: '',
      },
      modalVisible: false,
      hover: false,
    };
  }

  componentDidMount() {
    this.updateActiveTopic();
  }

  componentWillReceiveProps(nextProps) {
    const { data, isActive } = this.props;
    if (nextProps.isActive !== isActive) {
      this.setState({
        timerActive: data.topicKey === nextProps.isActive.activeTopicKey,
        activeData: nextProps.isActive,
      });
    }
    if (nextProps.data !== data) {
      this.setState({
        topicData: nextProps.data,
      });
    }
  }

  onFocus() {
    clearTimeout(this.timeoutID);
    this.showEdit();
  }

  onFocusOut() {
    this.timeoutID = setTimeout(() => {
      this.setState({
        editFormActive: false,
      });
    }, 0);
  }

  onHover(toggle) {
    this.setState({
      hover: toggle,
    });
  }

  updateActiveTopic() {
    database.doFetch(`users/${this.currentUser}/activeTopic`).on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        this.setState({
          activeData: snapshot.val(),
        });
      }
    });
  }

  saveToDatabase() {
    const { data } = this.props;
    database.start(data.topicKey, this.currentUser).then((activeData) => {
      this.setState({
        activeData,
      });
    });
  }

  startTimer() {
    const { isActive } = this.props;
    if (isActive.activeTopicKey === '') {
      this.setState({
        timerActive: true,
      },
      () => {
        this.saveToDatabase();
      });
    } else {
      this.toggleModal('another_topic');
    }
  }

  showEdit() {
    const { editFormActive } = this.state;
    this.setState({
      editFormActive: !editFormActive,
    });
  }

  hideEdit() {
    this.setState({
      editFormActive: false,
    });
  }

  toggleModal(mode) {
    this.setState({
      modalVisible: mode,
    });
  }

  bulletColor() {
    const {
      timerActive,
      activeData,
      topicData,
      editFormActive,
    } = this.state;
    if (timerActive || activeData.activeTopicKey === '' || editFormActive) {
      const color = topicData.color;
      return color;
    }
    const color = CS.GreyBrighter;
    return color;
  }

  timeoutID;

  renderEditForm() {
    const { topicData, editFormActive } = this.state;
    if (editFormActive) {
      return (
        <RollOutPanel onClose={() => { this.hideEdit(); }}>
          <EditForm data={topicData} />
        </RollOutPanel>
      );
    }
    return null;
  }

  renderModal() {
    const { modalVisible, activeData, topicData } = this.state;
    let modal = null;
    if (modalVisible === 'another_topic') {
      modal = (
        <Modal
          message={`Topic ${activeData.topicName} is active now, if you want to stop current task and start counting ${topicData.name} click button below`}
          onClose={() => { this.toggleModal(false); }}
        >
          <div style={{ display: 'flex', flex: 1 }}>
            <Table>
              <Column title="Since last start:">
                <Stoper mode="tillnow" />
              </Column>
              <Column title="Today:">
                <Stoper mode="day" />
              </Column>
              <Column title="Overall:">
                <Stoper mode="" />
              </Column>
            </Table>
          </div>

          <BigButton
            title="Change topic"
            onPress={
              () => {
                database.stop(this.currentUser).then(() => this.startTimer());
                this.setState({ modalVisible: false });
              }
            }
          />
        </Modal>
      );
    } else if (modalVisible === 'on_stop') {
      modal = (
        <Modal
          message={`You stopped topic ${activeData.topicName}.`}
          onClose={() => { this.toggleModal(false); }}
        >
          <div style={{ display: 'flex', flex: 1 }}>
            <Table>
              <Column title="Since last start:">
                <Stoper mode="tillnow" />
              </Column>
              <Column title="Today:">
                <Stoper mode="day" />
              </Column>
              <Column title="Overall:">
                <Stoper mode="" />
              </Column>
            </Table>
          </div>

          { setTimeout(() => { this.toggleModal(false); }, 2000) }
        </Modal>
      );
    }
    return modal;
  }

  renderTimer() {
    const { timerActive } = this.state;
    if (timerActive) {
      return (
        <RollOutPanel onClose={false}>
          <Table>
            <Column title="Since last start:">
              <Stoper mode="tillnow" />
            </Column>
            <Column title="Today:">
              <Stoper mode="day" />
            </Column>
            <Column title="Overall:">
              <Stoper mode="" />
            </Column>
            <Column>
              <BigButton title="Stop" onPress={() => { database.stop(this.currentUser); this.toggleModal('on_stop'); }} />
            </Column>
          </Table>
        </RollOutPanel>
      );
    }
    return null;
  }

  render() {
    const { children } = this.props;
    const { timerActive, activeData, hover } = this.state;
    let containerStyle;
    if (timerActive) {
      containerStyle = styles.activeContainer;
    } else if (!hover) {
      containerStyle = styles.container;
    } else {
      containerStyle = styles.hoverContainer;
    }
    return (
      <React.Fragment>
        <div
          style={containerStyle}
          onMouseEnter={() => { this.onHover(true); }}
          onMouseLeave={() => { this.onHover(false); }}
        >
          <div style={{ position: 'relative', left: -16 }}>
            <ListBullet
              size={32}
              color={this.bulletColor()}
              active={timerActive}
              onPress={() => { this.startTimer(); }}
            />
          </div>
          <div
            role="presentation"
            onClick={() => { this.onFocus(); }}
            style={styles.listText}
          >
            {children}
          </div>
        </div>
        <div id="timer">
          {activeData.activeTopicKey !== '' ? this.renderTimer() : null}
        </div>
        <div>
          {this.renderEditForm()}
        </div>
        {this.renderModal()}
      </React.Fragment>
    );
  }
}

const styles = {
  container: {
    boxSizing: 'border-box',
    marginLeft: 16,
    marginTop: 3,
    display: 'flex',
    flexDirection: 'row',
    fontSize: 12,
    borderBottomColor: CS.GreyBrighter,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderTopColor: CS.GreyBrighter,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hoverContainer: {
    boxSizing: 'border-box',
    marginLeft: 16,
    marginTop: 3,
    display: 'flex',
    flexDirection: 'row',
    fontSize: 12,
    backgroundColor: CS.GreyBrighter,
    borderBottomColor: CS.GreyBrighter,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderTopColor: CS.GreyBrighter,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
  },
  activeContainer: {
    boxSizing: 'border-box',
    marginLeft: 16,
    marginTop: 3,
    display: 'flex',
    flexDirection: 'row',
    fontSize: 12,
    borderTopColor: CS.GreyBrighter,
    borderTopWidth: 1,
    borderTopStyle: 'solid',
    borderTopRightRadius: 16,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listText: {
    flex: 1,
    fontWeight: 400,
    color: CS.Grey,
  },
};

export default ListItem;
