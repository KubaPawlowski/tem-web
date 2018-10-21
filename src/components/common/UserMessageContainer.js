import React from 'react';
import * as CS from '../../index.css';

const UserMessageContainer = ({ children }) => {
  return (
    <div style={styles.container}>
      {children}
    </div>
  );
};

const styles = {
  container: {
    color: CS.GreenColor,
    fontSize: 10,
  },
};

export { UserMessageContainer };
