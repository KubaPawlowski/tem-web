import React from 'react';
import { RoundedContainer } from '../common';

const NotificationsBox = ({ children }) => {
  return (
    <div style={styles.container}>
      <RoundedContainer>
        {children}
      </RoundedContainer>
    </div>
  );
};

const styles = {
  container: {
    position: 'absolute',
    top: 34,
    width: '25vw',
    right: 8,
  },
};

export { NotificationsBox };
