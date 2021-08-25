// IMPORTS ////////////////////////////////////////////////////////////////////

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';
import {
  RiGithubFill,
  RiLinkedinBoxFill,
  RiMailSendFill,
} from 'react-icons/ri';
import { Spin as Hamburger } from 'hamburger-react';

import NavLink from './nav-link';
import NavIconLink from './nav-icon-link';

// STYLES /////////////////////////////////////////////////////////////////////

const underlineHoverTransition = `
  transition: color 200ms ease-out;
  position: relative;
  white-space: nowrap;

  &::before,
  &::after {
    position: absolute;
    width: 95%;
    height: 4px;
    border-radius: 2px;
    background: var(--light);
    top: 105%;
    left: 2.5%;
    pointer-events: none;
  }

  &::before {
    content: '';
    transform-origin: 100% 50%;
    transform: scale3d(0, 1, 1);
    transition: transform 0.3s;
  }

  &:hover::before,
  &:focus::before {
    transform-origin: 0% 50%;
    transform: scale3d(1, 1, 1);
  }
`;

const Header = styled.header`
  position: absolute;
  z-index: 2;
  height: 100vh;
  width: 100%;
  padding: 1rem;
`;

const Nav = styled.nav`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;

  visibility: ${({ navOpen }) => (navOpen ? 'visible' : 'hidden')};
  opacity: ${({ navOpen }) => (navOpen ? 1 : 0)};
  transition: opacity 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
    visibility 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);

  background-color: var(--accent);
  font-size: 1.375rem;

  a {
    color: var(--light);
    text-decoration: none;
    font-weight: 800;
    letter-spacing: 0.5px;
    cursor: pointer;
  }

  ul {
    width: max-content;
    margin: 0;
    padding: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;

    list-style-type: none;

    li {
      ${underlineHoverTransition}
    }
  }

  .text-links-list {
    margin: 0;

    flex-direction: column;

    transition: all 0.3s ease-in-out;
    text-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
    transform: scale(1);
  }

  .icon-links-list {
    flex-direction: row;
    font-size: 1.65rem;

    a * {
      display: block;
    }
  }

  @media (min-width: 64em) {
    z-index: 0;
    height: max-content;
    position: static;
    padding: 1.5em 2em;

    flex-direction: row;
    justify-content: space-between;

    background: none;

    a {
      font-size: 1rem;
    }

    .text-links-list {
      flex-direction: row;
    }

    .icon-links-list {
      svg {
        font-size: 1.35rem;
      }
    }
  }
`;

const Heading = styled.h1`
  margin: 0;

  ${underlineHoverTransition}

  @media (min-width: 64em) {
    font-size: 1rem;
  }
`;

// COMPONENTS /////////////////////////////////////////////////////////////////

const HeaderSection = ({ siteTitle }) => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <Header>
      <Nav navOpen={navOpen}>
        <Heading>
          <Link to="/#landing">{siteTitle}</Link>
        </Heading>

        <ul className="text-links-list">
          <NavLink link="/#projects">🛠️ Projects</NavLink>

          <NavLink link="/#about">👩🏼 About</NavLink>

          <NavLink link="/#contact">📥 Contact</NavLink>

          <NavLink link="/resume/">📑 Resume</NavLink>

          <NavLink link="/digital-garden/">🌿 Digital Garden</NavLink>
        </ul>
        <ul className="icon-links-list">
          <NavIconLink link="http://github.ellyloel.com/">
            <RiGithubFill />
          </NavIconLink>

          <NavIconLink link="http://linkedin.ellyloel.com/">
            <RiLinkedinBoxFill />
          </NavIconLink>

          <NavIconLink link="mailto:hello@ellyloel.com">
            <RiMailSendFill />
          </NavIconLink>
        </ul>
      </Nav>
      <Hamburger
        toggled={navOpen}
        toggle={setNavOpen}
        rounded
        label="Show menu"
        color="#FFF"
      />
    </Header>
  );
};

HeaderSection.propTypes = {
  siteTitle: PropTypes.string,
};

HeaderSection.defaultProps = {
  siteTitle: ``,
};

export default HeaderSection;
