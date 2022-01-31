import React from 'react';
import Header from 'gatsby-theme-carbon/src/components/Header';

function CustomHeader(props) {
  return (
    <Header {...props}>
      Eric N.&nbsp;<span>Garcia</span>
    </Header>
  );
}

export default CustomHeader;
