// IMPORTS ////////////////////////////////////////////////////////////////////

import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { styled } from '../../../stitches.config';

// COMPONENTS /////////////////////////////////////////////////////////////////

const Link = styled(GatsbyLink, {});

const NavLink = ({ link, navOpen, setNavOpen, children }) => {
  return (
    <li onClick={() => setNavOpen(!navOpen)}>
      <Link to={link}>{children}</Link>
    </li>
  );
};

export default NavLink;
