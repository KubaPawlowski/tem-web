import React from 'react';
import * as CS from '../../constants/colors';

const Content = ({ children }) => {
  return (
    <div style={styles.container} className="content">
      <div style={styles.innerContainer}>
        {children}
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: CS.GreyBrighter,
    flex: 1,
    padding: 8,
    overflowX: 'auto',
  },
};

export { Content };
