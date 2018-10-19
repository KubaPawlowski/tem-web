import React from 'react';
import * as CS from '../../index.css';

const BigButton = ({ title, onPress, fixedWidth }) => {

  const styles = {
    button: {
      backgroundColor: CS.PrimaryBrighter,
      border: 'none',
      fontSize: 12,
      fontWeight: 400,
      color: CS.SecondaryColor,
      padding: 6,
      borderRadius: 2,
      textTransform: 'uppercase',
      borderColor: CS.PrimaryBrighter,
      borderWidth: 1,
      borderStyle: 'solid',
      textAlign: 'center',
      width: fixedWidth || 'auto',
      height: 16,
    },
  };

  const onKeyDown = (event) => {
    const key = event.which || event.keyCode;
    if (key === 13) {
      return onPress();
    }
    return null;
  };

  const { button } = styles;
  return (
    <div
      role="button"
      tabIndex="0"
      onKeyDown={(event) => { onKeyDown(event); }}
      onClick={onPress}
      style={button}
    >
      {title}
    </div>
  );
};

export { BigButton };
