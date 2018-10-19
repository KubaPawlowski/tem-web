import React from 'react';

import * as CS from '../../index.css';

const Button = ({ children, disabled, type }) => {
  return (
    <button type={type} disabled={disabled} style={styles.button}>
      {children}
    </button>
  );
};

const styles = {
  button: {
    border: 'none',
    padding: 8,
    backgroundColor: CS.PrimaryColor,
    width: '100%',
    height: 32,
    borderRadius: 2,
    textTransform: 'uppercase',
  },
};

export { Button };
