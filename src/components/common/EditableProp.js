import React, { Component } from 'react';
import { firebase, database } from '../../firebase';
import { InputField, Label } from '.';

import ColorPicker from './ColorPicker';

class EditableProp extends Component {
  constructor(props) {
    super(props);
    const { currentUser } = firebase.auth;
    this.currentUser = currentUser.uid;
    const { data } = this.props;
    // reference to database passed to component
    const { reference } = this.props;

    const key = typeof data === 'undefined' ? this.props.mode : data.key;
    const value = typeof data === 'undefined' ? this.props.value : data.value;
    const ref = typeof reference === 'undefined' ? null : `${reference}/${key}`;

    // for local input

    this.state = {
      key,
      initialValue: value,
      value,
      disabled: true,
      reference: ref,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (state.reference === null && props.value !== state.value) {
      return {
        value: props.value,
      };
    }
    return null;
  }

  onChangeValue(value) {
    const { onChange, validation, mode } = this.props;
    const clean = typeof (validation) !== 'undefined' ? validation(value) : value;
    this.setState({
      value: clean,
    }, () => {
      return typeof (onChange) !== 'undefined' ? onChange(value, mode) : null;
    });
  }

  onFocus() {
    clearTimeout(this.timeoutID);
    this.setState({
      disabled: false,
    }, () => { this.moveCursor(); });
  }

  onFocusOut() {
    this.timeoutID = setTimeout(() => {
      this.onSave();

    }, 0);
  }

  onDiscard() {
    const { initialValue } = this.state;
    this.setState({
      disabled: true,
      value: initialValue,
    });
  }

  onSave() {
    const { value, reference } = this.state;
    const { onChange, mode } = this.props;
    this.setState({
      disabled: true,
      initialValue: value,
    }, () => {
      reference !== null ? database.doFetch(reference).set(value) : null;
      typeof (onChange) !== 'undefined' ? onChange(value, mode) : null;
    });
  }

  onKeyDown(event) {
    const key = event.which || event.keyCode;
    if (key === 13) {
      this.onSave();
    } else if (key === 27) {
      this.onDiscard();
    }
  }

  callback = (value) => {
    this.setState({
      value,
    }, () => { this.onSave(); });
  }

  moveCursor() {
    const { key } = this.state;
    const target = document.getElementById(key);
    target.focus();
  }

  timeoutID;

  renderEditType() {
    const { key, value, disabled } = this.state;

    switch (key) {
      case 'color':
        return (
          <ColorPicker
            onChange={this.callback}
            value={value}
          />
        );
      default:
        return (
          <InputField
            onClick={() => { this.onFocus(); }}
            onBlurCapture={() => { this.onFocusOut(); }}
            onKeyDown={(event) => { this.onKeyDown(event); }}
            onChange={(event) => { this.onChangeValue(event.target.value); }}
            type="text"
            value={value}
            id={key}
            disabled={disabled}
          />
        );
    }
  }

  render() {
    const { key } = this.state;
    console.log(this.props.value)
    return (
      <React.Fragment>
        <div>
          <Label title={key} />
          <div style={styles.container}>
            {this.renderEditType()}
          </div>
        </div>

      </React.Fragment>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
};

export default EditableProp;
