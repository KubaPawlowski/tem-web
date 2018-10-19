import React from 'react';
import * as CS from '../../index.css';

const DataBarContainer = ({
  barLength,
  id,
  marginLeft,
  color,
  onMouseEnter,
  onMouseLeave,
  children,
}) => {
  const styles = {
    dataBar: {

      left: marginLeft,
      width: barLength,
      minWidth: '0.5%',
      backgroundColor: color,
      height: 8,
      position: 'absolute',
      marginTop: 8,
    },
  };

  return (
    <div
      id={id}
      style={styles.dataBar}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
};

export { DataBarContainer };
