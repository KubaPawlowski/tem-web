import React, { Component } from 'react';

class Repeat extends Component {
  repeat() {
    const { count, children } = this.props;
    const array = [];
    let i;
    for (i = 0; i < count; i++) {
      const newElement = React.cloneElement(children, {
        key: i,
        children: `${i}:00`,
      });
      array.push(newElement);
    }
    return array;
  }

  render() {
    return this.repeat();
  }
}

export default Repeat;
