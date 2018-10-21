import React from 'react';
import { SimpleHeader } from '.';

const Sort = ({ onChange, value }) => (
  <div onClick={onChange} style={{ width: 130 }}>
    <SimpleHeader>
      SORTING: <b>{value}</b>
    </SimpleHeader>
  </div>
);

export { Sort };
