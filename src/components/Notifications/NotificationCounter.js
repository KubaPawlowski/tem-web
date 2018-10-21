import React from 'react';
import * as CS from '../../index.css';

const NotificationCounter = ({ count }) => {

  const styles = {
    container: {
      borderRadius: 2,
      borderColor: CS.Red,
      borderWidth: 1,
      borderStyle: 'solid',
      position: 'absolute',
      bottom: 1,
      right: 5,
      backgroundColor: CS.SecondaryColor,
      textAlign: 'center',
      color: CS.Red,
      fontSize: 9,
      fontWeight: 600,
      paddingRight: 1,
      paddingLeft: 1,
    },
  };
  return (
    <div style={styles.container}>
      {count}
    </div>
  );
};

export { NotificationCounter };
