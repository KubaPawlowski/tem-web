import React from 'react';
import { IconButton } from './';
import * as CS from '../../index.css';

const RollOutPanel = ({ children, title, onClose }) => {
  return (
    <div style={styles.container}>
      <div style={styles.row}>
        <div style={styles.title}>{title}</div>
      </div>
      {children}
      { onClose === false
        ? null
        : <div style={styles.rollup} onClick={onClose}><div style={styles.rollupButton} /></div>
      }
    </div>
  );
};

const styles = {
  container: {
    padding: 8,
    display: 'flex',
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
    borderBottomColor: CS.GreyBrighter,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 16,
  },
  row: {
    display: 'flex',
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  rollup: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rollupButton: {

    width: 20,
    borderTopColor: CS.Grey,
    borderTopStyle: 'solid',
    borderTopWidth: 1,
    borderBottomColor: CS.Grey,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    height: 2,
  },
};

export { RollOutPanel };
