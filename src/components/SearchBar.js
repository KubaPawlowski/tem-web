import React, { Component } from 'react';
import { InputField } from './common';
import * as CS from '../constants/colors';

class SearchBar extends Component {
  render() {
    return (
      <div style={styles.container}>
        <InputField
          placeholder="Search"
        />
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    padding: 8,
    backgroundColor: CS.SecondaryColor,
  }
};

export default SearchBar;
