import React from 'react';
import * as CS from '../../index.css';

const RoundedContainer = ({ children }) => {
  return (
    <div style={styles.container}>
      {children}
    </div>
  );
};


const styles = {
  container: {
    backgroundColor: CS.SecondaryColor,
    padding: 8,
    paddingBottom: 32,
    borderRadius: 2,
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.1)',
  },
};

export { RoundedContainer };
