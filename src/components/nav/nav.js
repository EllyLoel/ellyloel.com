// IMPORTS ////////////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { styled } from '../../../stitches.config';
import { RiGithubFill, RiLinkedinBoxFill } from 'react-icons/ri';
import { SiPolywork } from 'react-icons/si';
import { BsMailbox2 } from 'react-icons/bs';
import { Spin as Hamburger } from 'hamburger-react';

import NavLink from './nav-link';
import NavIconLink from './nav-icon-link';
import ThemeToggle from '../theme-toggle';

// STYLES /////////////////////////////////////////////////////////////////////

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

const Nav = styled('nav', {
  width: '100%',
  height: '100%',
  position: 'fixed',
  zIndex: 1,
  left: '0',
  top: '0',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '2rem',

  visibility: 'hidden',
  opacity: '0',
  transition: `
    opacity 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    visibility 0.5s cubic-bezier(0.77, 0.2, 0.05, 1)`,
  backgroundColor: 'var(--color-primary)',
  fontSize: '1.375rem',

  '& a': {
    color: 'var(--color-text)',
    textDecoration: 'none',
    fontWeight: 800,
    letterSpacing: '0.5px',
    cursor: 'pointer',
  },

  '& ul': {
    width: 'max-content',
    margin: '0',
    padding: '0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.75rem',
    listStyleType: 'none',
    li: {
      ...underlineHoverTransition,
    },
  },

  '& .text-links-list': {
    margin: '0',
    flexDirection: 'column',
    transition: 'all 0.3s ease-in-out',
    textShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
    transform: 'scale(1)',
  },

  '& .icon-links-list': {
    flexDirection: 'row',
    fontSize: '1.65rem',

    '& a *': {
      display: 'block',
    },
  },

  '@laptopSmall': {
    zIndex: 0,
    height: 'max-content',
    position: 'static',
    padding: '1.5em 2em',
    flexDirection: 'row',
    justifyContent: 'space-between',
    visibility: 'visible',
    opacity: 1,
    background: 'none',

    '& a': {
      fontSize: '1rem',
      color: 'var(--color-text)',
    },

    '& .text-links-list': {
      flexDirection: 'row',
    },

    '& .icon-links-list': {
      '& svg': {
        fill: 'var(--color-text)',
        fontSize: '1.35rem',
      },
    },
  },

  variants: {
    navOpen: {
      true: {
        visibility: 'visible',
        opacity: 1,
      },
    },
  },
});

const Heading = styled('h1', {
  margin: '0',
  fontSize: '1rem',

  '& a': {
    fontFamily: "'Nanum Pen Script', cursive",
    fontSize: '3rem',
    color: 'var(--color-text)',

    '@laptopSmall': {
      fontSize: '1.6rem',
    },
  },

  ...underlineHoverTransition,
});

const StyledHamburger = styled('div', {
  position: 'fixed',
  zIndex: 1,
  top: '1rem',
  left: '1rem',

  '@laptopSmall': {
    display: 'none',
  },
});

// COMPONENTS /////////////////////////////////////////////////////////////////

const NavSection = ({ siteTitle, color, navColor }) => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <Nav id="nav" navOpen={navOpen}>
        <Heading onClick={() => setNavOpen(!navOpen)}>
          <Link to="/">{siteTitle}</Link>
        </Heading>

        <ul className="text-links-list">
          <NavLink link="/about/" navOpen={navOpen} setNavOpen={setNavOpen}>
            <i className="twa twa-woman-technologist-medium-light-skin-tone"></i>{' '}
            About
          </NavLink>

          <NavLink link="/projects/" navOpen={navOpen} setNavOpen={setNavOpen}>
            <i className="twa twa-card-file-box"></i> Projects
          </NavLink>

          <NavLink link="/resume/" navOpen={navOpen} setNavOpen={setNavOpen}>
            <i className="twa twa-bookmark-tabs"></i> Resume
          </NavLink>

          <NavLink
            link="/digital-garden/"
            navOpen={navOpen}
            setNavOpen={setNavOpen}
          >
            <i className="twa twa-herb"></i> Digital Garden
          </NavLink>

          <NavLink link="/speaking/" navOpen={navOpen} setNavOpen={setNavOpen}>
            <i className="twa twa-studio-microphone"></i> Speaking
          </NavLink>

          <NavLink link="/now/" navOpen={navOpen} setNavOpen={setNavOpen}>
            <i className="twa twa-spiral-calendar"></i> Timeline
          </NavLink>
        </ul>
        <ul className="icon-links-list">
          <NavIconLink
            link="http://timeline.ellyloel.com/"
            navOpen={navOpen}
            setNavOpen={setNavOpen}
          >
            <SiPolywork style={{ transform: 'scale(0.8)' }} />
          </NavIconLink>

          <NavIconLink
            link="http://github.ellyloel.com/"
            navOpen={navOpen}
            setNavOpen={setNavOpen}
          >
            <RiGithubFill />
          </NavIconLink>

          <NavIconLink
            link="http://linkedin.ellyloel.com/"
            navOpen={navOpen}
            setNavOpen={setNavOpen}
          >
            <RiLinkedinBoxFill />
          </NavIconLink>

          <NavIconLink
            link="mailto:hello@ellyloel.com"
            navOpen={navOpen}
            setNavOpen={setNavOpen}
          >
            <BsMailbox2 />
          </NavIconLink>
          <ThemeToggle />
        </ul>
      </Nav>
      <StyledHamburger>
        <Hamburger
          toggled={navOpen}
          toggle={setNavOpen}
          rounded
          label="Show menu"
          color={
            navOpen ? 'var(--color-text)' : color ? color : 'var(--color-text)'
          }
        />
      </StyledHamburger>
    </>
  );
};

NavSection.propTypes = {
  siteTitle: PropTypes.string,
};

NavSection.defaultProps = {
  siteTitle: ``,
};

export default NavSection;
