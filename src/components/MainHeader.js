import React from 'react';
import SearchBar from './SearchBar';
import Notifications from './Notifications/Notifications';
import * as CS from '../constants/colors';

const MainHeader = () => {
  return (
    <div style={styles.container}>
      <SearchBar />
      <Notifications />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    padding: 8,
    backgroundColor: CS.SecondaryColor,
  },
};

export { MainHeader };
