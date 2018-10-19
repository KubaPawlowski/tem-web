import React from 'react';
import * as CS from '../../index.css';

const NoData = ({ children }) => {
  return (
    <div style={styles.text}>
      {children}
    </div>
  );
};

const styles = {
  text: {
    fontSize: 18,
    fontWeight: 800,
    color: CS.GreyBrighter,
    textAlign: 'center',
    lineHeight: '64px',
  },
};

export { NoData };
