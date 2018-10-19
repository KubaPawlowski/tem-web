import React, { Component } from 'react';

import { USER_VIEW_FILTER } from '../../constants/initialDataStructure';

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.state) {
      this.setState({
        ...nextProps,
      });
    }
  }

  renderListFiltered() {
    const { render } = this.props;
    const { dataSource } = this.state;
    const list = dataSource.map((item) => {
      if (USER_VIEW_FILTER.indexOf(item.key) < 0) {
        return render(item, dataSource.indexOf(item));
      }
      return null;
    });
    return list;
  }

  renderListFull() {
    const { render } = this.props;
    const { dataSource } = this.state;
    const list = dataSource.map((item) => {
      return render(item, dataSource.indexOf(item));
    });
    return list;
  }

  render() {
    const { filter } = this.props;
    return (
      <div style={styles.container}>
        {filter ? this.renderListFiltered() : this.renderListFull()}
      </div>
    );
  }
}

const styles = {
  container: {
    width: '100%',
  },
};

export default ListView;
