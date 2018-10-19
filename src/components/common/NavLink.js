import React from 'react';
import { Link } from 'react-router-dom';
import * as CS from '../../index.css';

const NavLink = ({ title, to, icon }) => {
  return (
    <Link to={to}>
      <div className="nav-link" style={styles.container}>
        <img alt='' src={icon} style={{ width: 12}} />
        <div style={styles.text}>
          {title}
        </div>
      </div>
    </Link>
  );
}

const styles = {
  container: {
    padding: 8,
    display: 'flex',
    height: 24,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomStyle: 'solid',
    borderBottomColor: CS.PrimaryBrighter,
    borderBottomWidth: 1
  },
  text: {
    paddingLeft: 8,
    fontSize: 12,
    textTransform: 'uppercase',
    fontWeight: 600
  }
}

export { NavLink };
