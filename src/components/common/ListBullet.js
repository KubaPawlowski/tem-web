import React from 'react';

import * as CS from '../../index.css';

const ListBullet = ({ size, color, active, onPress }) => {
  const styles = {
    bullet: {
      borderRadius: '50%',
      borderTopRightRadius: 0,
      height: size,
      width: size,
      transform: 'rotate(45deg)',
      backgroundColor: color,
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inside: {
      borderRadius: '50%',
      height: size - 6,
      width: size - 6,
      backgroundColor: CS.SecondaryColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.1)',
    },
    tick: {
      height: (size - 16) / 2,
      width: 1,
      backgroundColor: CS.GreyBrighter,
      borderLeftStyle: 'solid',
      borderLeftWidth: 1,
      borderLeftColor: CS.Grey,
      position: 'realtive',
      marginBottom: size - 16,

    },
  };

  const animatedTick = active ? 'tick' : null;

  return (
    <div onClick={onPress} style={styles.bullet}>
      <div style={styles.inside}>
        { active
          ? (
            <div className={animatedTick}>
              <div style={styles.tick} />
            </div>
          )
          : null
        }
      </div>
    </div>
  );
};

export { ListBullet };
