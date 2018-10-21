import React from 'react';
import { MainContainer } from './common';
import AuthorizedContent from './common/AuthorizedContent';
import Friends from './Friends/Friends';

const TestPage = () => (
  <MainContainer>
    <AuthorizedContent>
      <Friends />
    </AuthorizedContent>
  </MainContainer>
);

export default TestPage;
