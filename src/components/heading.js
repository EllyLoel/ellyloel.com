import React from 'react';
import styled from 'styled-components';

const StyledHeading = styled.h1`
  font-size: 4.25rem;
  margin: 2.5rem 0;

  @media (min-width: 64em) {
    font-size: 6rem;
  }
`;

const Heading = ({ children }) => {
  return <StyledHeading>{children}</StyledHeading>;
};

export default Heading;
