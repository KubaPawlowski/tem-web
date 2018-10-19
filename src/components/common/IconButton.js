import React from 'react';

const IconButton = ({ onPress, iconPath, size }) => {
  const onKeyDown = (event) => {
    const key = event.which || event.keyCode;
    if (key === 13) {
      return onPress();
    }
    return null;
  };

  return (
    <div
      role="button"
      tabIndex="0"
      onKeyDown={(event) => { onKeyDown(event); }}
      onClick={onPress}
    >
      <img alt="" src={iconPath} style={{ width: size }} />
    </div>
  );
};

export { IconButton };
