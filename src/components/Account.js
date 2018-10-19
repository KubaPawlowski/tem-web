import React from 'react';
import { MainContainer } from './common';
import AuthorizedContent from './common/AuthorizedContent';

const Account = () => {
  return (
    <MainContainer>
      <AuthorizedContent>
        <h1>Account Page</h1>
      </AuthorizedContent>
    </MainContainer>

  );
}

export default Account;
