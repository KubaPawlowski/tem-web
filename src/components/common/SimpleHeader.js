import React from 'react';
import * as CS from '../../index.css';

const SimpleHeader = ({ children, size }) => {
  const headerSize = typeof (size) !== 'undefined' ? size : 12;
  const styles = {
    container: {
      color: CS.Grey,
      fontSize: headerSize,
      textTransform: 'uppercase',
      lineHeight: '32px',
    },
  };
  return (
    <div style={styles.container}>
      {children}
    </div>
  );
};

export { SimpleHeader };
