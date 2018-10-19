import React, { Component } from 'react';

import * as CS from '../../index.css';

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.colors = [
      '#004E5A',
      '#00716C',
      '#BE9D7A',
      '#F58B53',
      '#F06F3E',
      '#D2691E',
      '#62BE58',
      '#C9440F',
      '#EAD845',
      '#539C64',
    ];
    const { value } = this.props;
    this.state = {
      value,
    };
  }

  changeColor(value) {
    const { onChange } = this.props;
    this.setState({
      value,
    }, () => { onChange(value); })
  }

  renderColorPicker() {
    const { value } = this.state;

    const picker = this.colors.map((item) => {
      const border = value === item ? {
        boxSizing: 'border-box',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: CS.Grey,
      } : null;
      const styles = {
        colorBox: {
          borderRadius: '50%',
          margin: 8,
          width: 16,
          height: 16,
          backgroundColor: item,
          ...border,
        },
      };
      return (
        <div style={styles.colorBox} onClick={() => this.changeColor(item)} />
      );
    });
    return picker;
  }

  render() {
    return (
      <div style={{ flexDirection: 'row', display: 'flex' }}>
        {this.renderColorPicker()}
      </div>
    );
  }
}

export default ColorPicker;
