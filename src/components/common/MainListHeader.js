import React from 'react';

const MainListHeader = ({ children }) => (
  <div style={styles.container}>
    { children }
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
};

export { MainListHeader };
