import React, { Component } from 'react';
import { firebase, database } from '../../firebase';
import ListView from './ListView';
import EditableProp from './EditableProp';
import { BigButton, Modal, RowContainer } from './';

import { TOPIC_DATA } from '../../constants/initialDataStructure';

class EditForm extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth;
    this.currentUser = currentUser.uid;
    const { data } = this.props;
    this.ref = `users/${this.currentUser}/userTopics/${data.topicKey}`;
    this.state = {
      dataSource: [],
      modalVisible: false,
    };
    this.listItem = (item, index) => {
      return (
        <React.Fragment key={item.key + index}>
          <EditableProp data={item} reference={this.ref} />
        </React.Fragment>
      );
    };
  }

  componentDidMount() {
    this.fetchDataWithKeys(this.ref);
  }

  fetchDataWithKeys(ref) {
    database.doFetch(ref).on(
      'value',
      (snapshot) => {
        const data = [];
        snapshot.forEach((child) => {
          data.push({
            key: child.key,
            value: child.val(),
          });
        });

        const dataTemplate = TOPIC_DATA;

        const outputData = [];
        dataTemplate.forEach((template) => {
          const data2 = { key: '' };
          data.forEach((item) => {
            if (template.key === item.key) {
              data2.value = item.value;
              data2.key = template.key;
            }
          });

          if (data2.key === '') {
            data2.value = template.value;
            data2.key = template.key;
          }
          outputData.push(data2);
        });

        this.setState({
          dataSource: outputData,
        });
      },
    );
  }

  showModal() {
    this.setState({
      modalVisible: true,
    });
  }

  toggleModal() {
    this.setState({ modalVisible: false });
  }

  renderModal() {
    const { modalVisible } = this.state;
    if (modalVisible) {
      return (
        <Modal
          message="Are you sure that you want to delete this topic?"
          onClose={() => this.toggleModal()}
        >
          <RowContainer>
            <BigButton fixedWidth={200} title="Yes, I am sure" onPress={() => database.remove(this.ref)} />
            <BigButton fixedWidth={200} title="No" onPress={() => this.toggleModal()} />
          </RowContainer>
        </Modal>
      );
    }
    return null;
  }

  render() {
    const { dataSource } = this.state;
    return (
      <React.Fragment>
        <ListView dataSource={dataSource} filter render={this.listItem} />
        <BigButton title="Delete topic" onPress={() => this.showModal()} />
        {this.renderModal()}
      </React.Fragment>
    );
  }
}

export default EditForm;
