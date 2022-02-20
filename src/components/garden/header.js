import React from 'react';
import { styled } from '../../../stitches.config';

const HeaderStyled = styled('header', {
  gridArea: 'header',

  '& h1': {
    margin: '0',
    fontSize: '4rem',
    lineHeight: 1,
    color: 'var(--color-text)',
    fontFamily: "'Nanum Pen Script', cursive",

    '& span': {
      marginLeft: '3px',
      verticalAlign: 'top',
      fontSize: '0.8em',
    },
  },

  '& p': {
    marginBottom: '0',
    lineHeight: 1.7,
  },

  '@laptopSmall': {
    '& p': {
      maxWidth: '660px',
    },
  },
});

const Header = () => {
  return (
    <HeaderStyled>
      <h1>
        My Digital Garden <i className="twa twa-leaf-fluttering-in-wind"></i>
      </h1>
      <p>
        A collection of my ideas that I&apos;m nurturing out in the open. The
        notes range from seedlings, which are fresh out of my mind, to budding,
        which are developing, to evergreen, which are polished ideas.
      </p>
    </HeaderStyled>
  );
};

export default Header;
