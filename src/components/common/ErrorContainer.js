import React from 'react';
import * as CS from '../../index.css';

const ErrorContainer = ({ children }) => {
  return (
    <div style={styles.container}>
      {children}
    </div>
  );
};

const styles = {
  container: {
    color: CS.Red,
    fontSize: 10,
  },
};

export { ErrorContainer };
