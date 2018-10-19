import React from 'react';

import * as CS from '../../index.css';

const Sort = ({ onChange, value }) => (
  <div style={styles.text} onClick={onChange}>
    SORTING: <b>{value}</b>
  </div>
);

const styles = {
  text: {
    width: 130,
    color: CS.Grey,
    fontSize: 12,
    textTransform: 'uppercase',
    lineHeight: '32px',
  },
};

export { Sort };
