import React from 'react';
import { Spinner } from '.';
import * as CS from '../../index.css';

const Loading = ({ children }) => (
  <div style={styles.container}>
    <Spinner size={64} />
    {children}
  </div>
);

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: CS.PrimaryColor,
  },
};

export { Loading };
