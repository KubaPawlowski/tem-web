import React from 'react';

const RowContainer = ({ children }) => (
  <div style={styles.container} className="row">
    {children}
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
  },
};

export { RowContainer };
