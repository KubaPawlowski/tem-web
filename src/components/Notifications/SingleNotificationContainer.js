import React from 'react';
import * as CS from '../../index.css';

const SingleNotificationContainer = ({ children, readed, onPress }) => {
  const styles = {
    container: {
      display: 'flex',
      flex: 1,
      flexDirecton: 'row',
      backgroundColor: readed ? CS.SecondaryColor : CS.GreyBrighter,
      padding: 8,
      fontSize: 12,
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    },
  };

  return (
    <div style={{ ...styles.container }} onClick={onPress}>
      {children}
    </div>
  );
};

export { SingleNotificationContainer };
