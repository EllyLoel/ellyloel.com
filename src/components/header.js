import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const Header = ({ siteTitle }) => (
  <header>
    <nav>
      <Link to="/#landing">
        <h1>{siteTitle}</h1>
      </Link>
      <ul>
        <li>
          <Link to="/#projects">Projects</Link>
        </li>

        <li>
          <Link to="/#about">About</Link>
        </li>

        <li>
          <Link to="/#contact">Contact</Link>
        </li>

        <li>
          <Link to="/resume/">Resume</Link>
        </li>

        <li>
          <Link to="/digital-garden/">Digital Garden</Link>
        </li>
      </ul>
      <ul>
        <li>
          <a
            href="http://github.ellyloel.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/github-fill.svg" alt="GitHub" />
          </a>
        </li>

        <li>
          <a
            href="http://linkedin.ellyloel.com/"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/images/linkedin-box-fill.svg" alt="LinkedIn" />
          </a>
        </li>

        <li>
          <a href="mailto:hello@ellyloel.com">
            <img src="/images/mail-fill.svg" alt="Email" />
          </a>
        </li>
      </ul>
    </nav>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
