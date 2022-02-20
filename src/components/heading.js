import React from 'react';
import { styled } from '../../stitches.config';

const StyledHeading = styled('h1', {
  fontSize: '4.25rem',
  margin: '2.5rem 0',

  '@laptopSmall': {
    fontSize: '6rem',
  },
});

const Heading = ({ children }) => {
  return <StyledHeading>{children}</StyledHeading>;
};

export default Heading;
