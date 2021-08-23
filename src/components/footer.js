import * as React from 'react';
import PropTypes from 'prop-types';

const Footer = () => (
  <footer>
    © {new Date().getFullYear()}, Built with{' '}
    <span role="img" aria-label="sparkling heart">
      💖
    </span>
    {` `}by <a href="https://www.ellyloel.com">Elly</a>
  </footer>
);

Footer.propTypes = {
  siteTitle: PropTypes.string,
};

Footer.defaultProps = {
  siteTitle: ``,
};

export default Footer;
