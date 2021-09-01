import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const underlineHoverTransition = `
  transition: color 200ms ease-out;
  position: relative;
  white-space: nowrap;

  &::before,
  &::after {
    position: absolute;
    width: 95%;
    height: 2.5px;
    border-radius: 9999px;
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

const FooterStyled = styled.footer`
  ul {
    position: absolute;
    bottom: 2.5em;
    left: 50%;
    text-align: center;
    transform: translateX(-50%);

    list-style-type: none;

    display: grid;
    grid-template-columns: repeat(3, max-content);
    grid-template-rows: auto;
    justify-items: center;
    align-items: center;
    grid-gap: 5vw;

    margin-top: 0;
    margin-bottom: 0;
    padding: 0;

    li {
      ${underlineHoverTransition}

      a {
        text-decoration: none;
        color: var(--light);
      }
    }
  }

  small {
    width: max-content;
    position: absolute;
    bottom: 0.8rem;
    left: 50%;
    transform: translateX(-50%);

    color: var(--light);

    a {
      text-decoration: none;
      color: var(--light);

      ${underlineHoverTransition}
    }

    .logo {
      font-family: 'Nanum Pen Script', cursive;
      font-size: 1.25em;
    }
  }

  @media (max-width: 23.4375em) {
    ul {
      .linked-li {
        grid-column: 1;
        margin-left: 1.5em;
      }
    }
  }
`;

const Footer = () => (
  <FooterStyled>
    <ul>
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
      &copy; {new Date().getFullYear()}, Made with{' '}
      <span role="img" aria-label="sparkling heart">
        💖
      </span>
      {` `}by{' '}
      <Link to="/#about">
        <span className="logo">&lt;e//y&gt;</span>
      </Link>
    </small>
  </FooterStyled>
);

Footer.propTypes = {
  siteTitle: PropTypes.string,
};

Footer.defaultProps = {
  siteTitle: ``,
};

export default Footer;
