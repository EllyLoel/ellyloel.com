import * as React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';

const Footer = () => (
  <footer>
    © {new Date().getFullYear()}, Built with{' '}
    <span role="img" aria-label="sparkling heart">
      💖
    </span>
    {` `}by <Link to="/#about">Elly</Link>
  </footer>
);

Footer.propTypes = {
  siteTitle: PropTypes.string,
};

Footer.defaultProps = {
  siteTitle: ``,
};

export default Footer;
