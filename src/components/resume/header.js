import React from 'react';
import { styled } from '../../../stitches.config';

const HeaderStyled = styled('header', {
  gridArea: 'header',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: 'var(--shadow-elevation-low)',
  transition: 'all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)',

  '&:hover, &:focus': {
    transform: 'scale(1.015)',
    outline: '1px solid var(--color-primary)',
    boxShadow: 'var(--shadow-elevation-medium)',
  },
});

const Heading = styled('h1', {
  fontSize: '15vw',
  margin: '0',

  '@tabletLarge': {
    fontSize: '7vw',
  },

  '@laptopSmall': {
    fontSize: '8vw',
  },

  '@desktopSmall': {
    fontSize: '6vw',
  },

  '@desktopLarge': {
    fontSize: '4.5vw',
  },

  '@desktopXLarge': {
    fontSize: '4vw',
  },
});

const Subheading = styled('p', {
  fontSize: '3.25vw',
  textAlign: 'right',
  margin: '0',
  marginTop: '-0.75em',
  textDecoration: 'underline',
  textDecorationColor: 'var(--color-primary)',
  textDecorationThickness: '2px',
  textUnderlineOffset: '2px',

  '@tabletLarge': {
    fontSize: '1.5vw',
  },

  '@desktopSmall': {
    fontSize: '1.3vw',
  },

  '@desktopLarge': {
    fontSize: '1vw',
  },

  '@desktopXLarge': {
    fontSize: '1vw',
  },
});

const Header = () => {
  return (
    <HeaderStyled>
      <Heading>Elly Loel</Heading>
      <Subheading>Web Developer & Designer</Subheading>
    </HeaderStyled>
  );
};

export default Header;
