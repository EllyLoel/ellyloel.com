import * as React from 'react';
import styled from 'styled-components';

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
    background: var(--color-text);
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
    list-style-type: none;

    display: grid;
    grid-template-columns: repeat(4, max-content);
    grid-template-rows: auto;
    justify-content: center;
    justify-items: center;
    align-items: center;
    grid-gap: 5vw;

    margin-top: 0;
    margin-bottom: 1em;
    padding: 0;

    li {
      ${underlineHoverTransition}

      a {
        text-decoration: none;
        color: var(--color-text);
      }
    }
  }

  small {
    display: flex;
    justify-content: center;
    margin-bottom: 1em;

    color: var(--color-text);

    a {
      text-decoration: none;
      color: var(--color-text);

      ${underlineHoverTransition}
    }

    .logo {
      font-family: 'Nanum Pen Script', cursive;
      font-size: 1.25em;
    }
  }

  @media (max-width: 31.25em) {
    ul {
      grid-template-columns: repeat(2, max-content);
      grid-template-rows: auto;
    }
  }
`;

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
