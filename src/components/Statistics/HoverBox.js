import React from 'react';
import * as CS from '../../index.css';

const HoverBox = ({ data }) => {
  const styles = {
    container: {
    //  display: 'flex',
      flexDirection: 'column',
      zIndex: 100000000,
      backgroundColor: CS.SecondaryColor,
      position: 'absolute',
      width: 100,
      top: 10,
      right: 0,
      padding: 8,
      paddingBottom: 32,
      borderRadius: 2,
      boxShadow: `0 1px 2px 0 ${data.color}, 0 1px 2px 0 ${data.color}`,
    },
  };
  return (
    <div style={styles.container}>
      <div>{data.dayEditingTime}</div>
      <div>{data.startTime}</div>
      <div>{data.endTime}</div>
    </div>
  );
};

export { HoverBox };
