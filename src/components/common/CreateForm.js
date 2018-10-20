import React, { Component } from 'react';
import { firebase, database } from '../../firebase';
import ListView from './ListView';
import {
  BigButton,
  RowContainer,
} from '.';
import EditableProp from './EditableProp';

import { TOPIC_DATA } from '../../constants/initialDataStructure';

class EditForm extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth;
    this.currentUser = currentUser.uid;
    const initialState = TOPIC_DATA;
    this.state = {
      dataSource: initialState,
    };

    this.listItem = (item, index) => {
      return (
        <React.Fragment key={item.key + index}>
          <EditableProp
            onChange={value => this.onChangeText(value, index)}
            data={item}
            value={item.value}
          />
        </React.Fragment>
      );
    };
  }

  onChangeText = (value, index) => {
        console.log(value);
    const { dataSource } = this.state;
    const data = [];
    dataSource.forEach((item) => {
      data.push(
        data.length === index
          ? { key: item.key, value }
          : { key: item.key, value: item.value },
      );
    });
    this.setState({
      dataSource: data,
    });
  }


  onSave() {
    const { dataSource } = this.state;
    const { onHide } = this.props;
    const data = {};
    dataSource.forEach((item) => {
      data[item.key] = item.value;
    });
    const key = database.doFetch().push().getKey();
    const ref = database.doFetch(`users/${this.currentUser}/userTopics/${key}/`);

    ref.update(data);
    onHide();
  }

  resetForm() {
    this.setState({
      dataSource: TOPIC_DATA,
    });
  }

  render() {
    const { onHide} = this.props;
    const { dataSource } = this.state;
    return (
      <React.Fragment>
        <ListView dataSource={dataSource} filter render={this.listItem} />
        <RowContainer>
          <BigButton fixedWidth={200} title="Save" onPress={() => this.onSave()} />
          <BigButton fixedWidth={200} title="Reset" onPress={() => this.resetForm()} />
          <BigButton fixedWidth={200} title="Discard" onPress={() => onHide()} />
        </RowContainer>

      </React.Fragment>
    );
  }
}

export default EditForm;
