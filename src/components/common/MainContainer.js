import React from 'react';

import * as CS from '../../constants/colors';

const MainContainer = ({ children }) => {
  return (
    <div style={styles.container}>
      {children}
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    backgroundColor: CS.PrimaryColor,
    flex: 1,
    flexDirection: 'column',
    display: 'flex',
  },
};

export { MainContainer };
