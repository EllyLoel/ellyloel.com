import * as React from 'react';
import { styled } from '../../stitches.config';

const underlineHoverTransition = {
  transition: 'color 200ms ease-out',
  position: 'relative',
  whiteSpace: 'nowrap',

  '&::before, &::after': {
    position: 'absolute',
    width: '95%',
    height: '2.5px',
    borderRadius: '9999px',
    background: 'var(--color-text)',
    top: '105%',
    left: '2.5%',
    pointerEvents: 'none',
  },

  '&::before': {
    content: "''",
    transformOrigin: '100% 50%',
    transform: 'scale3d(0, 1, 1)',
    transition: 'transform 0.3s',
  },

  '&:hover::before, &:focus::before': {
    transformOrigin: '0% 50%',
    transform: 'scale3d(1, 1, 1)',
  },
};

const FooterStyled = styled('footer', {
  '& ul': {
    listStyleType: 'none',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, max-content)',
    gridTemplateRows: 'auto',
    justifyContent: 'center',
    justifyItems: 'center',
    alignItems: 'center',
    gridGap: '5vw',
    marginTop: '0',
    marginBottom: '1em',
    padding: '0',

    '& li': {
      ...underlineHoverTransition,

      '& a': {
        textDecoration: 'none',
        color: 'var(--color-text)',
      },
    },
  },

  '& small': {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1em',
    color: 'var(--color-text)',

    '& a': {
      textDecoration: 'none',
      color: 'var(--color-text)',
      ...underlineHoverTransition,
    },

    '& .logo': {
      fontFamily: "'Nanum Pen Script', cursive",
      fontSize: '1.25em',
    },
  },

  '@mobileLarge': {
    '& ul': {
      gridTemplateColumns: 'repeat(4, max-content)',
      gridTemplateRows: 'auto',
    },
  },
});

const Footer = () => (
  <FooterStyled>
    <ul>
      <li>
        <a href="http://timeline.ellyloel.com" target="_blank" rel="noreferrer">
          Timeline
        </a>
      </li>
      <li>
        <a href="http://linkedin.ellyloel.com" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </li>
      <li>
        <a href="http://github.ellyloel.com" target="_blank" rel="noreferrer">
          GitHub
        </a>
      </li>
      <li>
        <a href="mailto:hello@ellyloel.com">Email</a>
      </li>
    </ul>
    <small>
      &copy; 2021-{new Date().getFullYear()} All Rights Reserved, Made with{' '}
      <i className="twa twa-sparkling-heart"></i> by{' '}
      <a href="http://twitter.ellyloel.com" target="_blank" rel="noreferrer">
        <span className="logo">&lt;e//y&gt;</span>
      </a>
    </small>
  </FooterStyled>
);

export default Footer;
