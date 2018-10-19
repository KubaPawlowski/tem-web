import React from 'react';
import { MainContainer } from './common';
import AuthorizedContent from './common/AuthorizedContent';
import MainList from './MainList';

const HomePage = () => (
  <MainContainer>
    <AuthorizedContent>
      <MainList />
    </AuthorizedContent>
  </MainContainer>
);

export default HomePage;
