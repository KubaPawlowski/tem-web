import React from 'react';

import * as CS from '../../index.css';

const Spinner = ({ size }) => {
  const styles = {
    inside: {
      borderRadius: '50%',
      height: size - 6,
      width: size - 6,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderColor: CS.GreyBrighter,
      borderStyle: 'solid',
      borderWidth: size / 32,
    },
    tick: {
      height: (size - 16) / 2,
      width: size / 32,
      backgroundColor: CS.GreyBrighter,
      borderLeftStyle: 'solid',
      borderLeftWidth: size / 32,
      borderLeftColor: CS.Grey,
      position: 'realtive',
      marginBottom: size - 16,
    },
  };

  return (
    <div style={styles.inside}>
      <div className="tick">
        <div style={styles.tick} />
      </div>
      <div className="tick2">
        <div style={styles.tick} />
      </div>
    </div>
  );
};

export { Spinner };
