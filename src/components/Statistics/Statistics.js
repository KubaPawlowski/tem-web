import React from 'react';
import { MainContainer } from '../common';
import AuthorizedContent from '../common/AuthorizedContent';
import Daily from './Daily';

const StatisticsPage = () => {
  return (
    <MainContainer>
      <AuthorizedContent>
        <Daily />
      </AuthorizedContent>
    </MainContainer>
  );
};

export default StatisticsPage;
