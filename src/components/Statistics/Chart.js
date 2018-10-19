import React, { Component } from 'react';
import DataBar from './DataBar';

import * as CS from '../../index.css';

class Chart extends Component {
  constructor(props) {
    super(props);
    const topicData = this.props.data;
    this.state = {
      chartScale: 24, // hours
      hover: false,
    };
  }

  // potentially higher order component ?

  showData() {
    const { data } = this.props;
    const { chartScale } = this.state;
    const list = data.map((item) => {
      const { editingTime } = item;

      if (editingTime.length > 0) {
        const editBars = editingTime.map((editItem) => {
          const date = new Date(parseInt(editItem.startTime, 10));
          const h = date.getHours();
          const m = date.getMinutes() / 60;


          const marginLeft = `${(m + h) / (chartScale) * 100}%`;
          const barLength = `${editItem.dayEditingTime / (chartScale * 36)}%`;

          return (
            <DataBar
              id={item.name + editItem.dayEditingTime}
              barLength={barLength}
              marginLeft={marginLeft}
              color={item.color}
              data={editItem}
              topic={item.name}
            />

          );
        });
        return (
          <React.Fragment>
            {editBars}
          </React.Fragment>

        );
      }
    });
    return list;
  }

  render() {
    const { hover } = this.state;
    return (
      <div style={styles.container}>
        {hover ? this.renderHoverBox() : null}
        <div style={styles.chartContainer}>
          {this.showData()}
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    display: 'flex',
  },
  topicName: {
    fontSize: 12,
    textAlign: 'right',
    paddingRight: 8,
    lineHeight: '24px',
    width: 64,
    backgroundColor: CS.SecondaryColor,
  },
  chartContainer: {
    display: 'flex',
    flex: 9,
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: CS.GreyBrighter,
  },


  dataBar: {

    width: 10,
  },
};

export { Chart };
