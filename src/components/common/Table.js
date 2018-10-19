import React from 'react';

const Table = ({ children }) => (
  <div style={styles.container}>
    {children}
  </div>
);

const Column = ({ children, title }) => (
  <div style={styles.column}>
    <div style={styles.header}>{title}</div>
    {children}
  </div>
);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    width: '100%',
  },
  header: {
    fontWeight: 400,
    fontSize: 12,
    height: 16,
  },
  column: {
    paddingLeft: 8,
    paddingRight: 8,
  },
};

export { Table, Column };
