import React, { Component } from 'react';
import { time } from '../../functions';
import { HoverBox, DataBarContainer } from '.';
import * as CS from '../../index.css';
import Repeat from './Repeat';

class DataBar extends Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    const { dayEditingTime, startTime, endTime } = data;
    this.state = {
      hoverBox: false,
      startTime: time.getHour(startTime),
      endTime: time.getHour(endTime),
      dayEditingTime: time.secondsToDayHourSeconds(dayEditingTime),
    };
  }

  onMouseEnter = () => {
    this.setState({
      hoverBox: true,
    });
  };

  onMouseLeave = () => {
    this.setState({
      hoverBox: false,
    });
  };

  renderHover() {
    const {
      hoverBox,
      dayEditingTime,
      startTime,
      endTime,
    } = this.state;
    const { id, color } = this.props;
    if (!hoverBox) {
      return null;
    }
    return (
      <HoverBox
        data={
          {
            startTime,
            endTime,
            dayEditingTime,
            id,
            color,
          }
        }
      />
    );
  }

  render() {
    const { topic, color } = this.props;
    const styles = {
      grid: {
        flex: 1,
        display: 'flex',
        height: '100%',
        width: '100%',
        position: 'absolute',
      },
      vertLine: {
        borderLeftColor: CS.SecondaryColor,
        borderLeftStyle: 'solid',
        borderLeftWidth: 1,
        width: '1px',
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        fontSize: 8,
        color: CS.Grey,
      },
      data: {
        display: 'flex',
        flex: 9,
        flexDirection: 'row',
        borderBottomStyle: 'dashed',
        borderBottomWidth: 1,
        borderBottomColor: CS.SecondaryColor,
        position: 'relative',
        height: 24,
      },
      topicName: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        position: 'realtive',
        fontSize: 10,
        fontColor: CS.Grey,
        paddingLeft: 8,
        lineHeight: '24px',
        backgroundColor: color,
      },
    };

    return (
      <React.Fragment>
        <div style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>
          <div style={styles.topicName}>
            {topic}
          </div>
          <div style={styles.data}>
            <div style={styles.grid}>
              <Repeat count={24}>
                <div style={styles.vertLine} />
              </Repeat>
            </div>
            <DataBarContainer
              {...this.props}
              onMouseEnter={() => this.onMouseEnter()}
              onMouseLeave={() => this.onMouseLeave()}
            >
              {this.renderHover()}
            </DataBarContainer>
          </div>
        </div>
      </React.Fragment>
    );
  }
}



export default DataBar;
