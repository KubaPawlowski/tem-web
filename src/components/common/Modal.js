import React from 'react';
import { IconButton } from './';
import * as CS from '../../constants/colors.css';

const Modal = ({ children, onClose, message }) => {
  const { overlay, container, messageContainer } = styles;
  return (
    <div style={overlay}>
      <div style={container}>
        <div style={{ alignSelf: 'flex-end' }}>
          <IconButton onPress={onClose} iconPath={require('../../assets/cancel_red.png')} size={16} />
        </div>
        <div style={messageContainer}>
          <div>{message}</div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'absolute',
    display: 'flex',
    left: 0,
    top: 0,
    width: '100vw',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(255,255,255, 0.8)',
    zIndex: 1000000,

  },
  container: {
    display: 'flex',
    backgroundColor: CS.SecondaryColor,
    borderRadius: 5,
    borderStyle: 'solid',
    borderColor: CS.GreyBrighter,
    borderWidth: 1,
    padding: 16,
    width: 'auto',
    flexDirection: 'column',
    minHeight: '40vh',
    position: 'relative',
    top: -50,
    alignItems: 'space-evenly',
  },
  messageContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
};

export { Modal };
