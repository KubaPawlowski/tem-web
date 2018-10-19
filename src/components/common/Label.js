import React from 'react';
import * as CS from '../../index.css';

const Label = ({ title }) => {
  return (
    <div className="label" style={styles.container}>
      {title}
    </div>
  );
};

const styles = {
  container: {
    textTransform: 'uppercase',
    fontSize: 10,
    paddingTop: 2,
    color: CS.Grey,
  },
};

export { Label };
