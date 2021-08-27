// IMPORTS ////////////////////////////////////////////////////////////////////

import React from 'react';
import { Link } from 'gatsby';

// COMPONENTS /////////////////////////////////////////////////////////////////

const NavLink = ({ link, navOpen, setNavOpen, children }) => {
  return (
    <li onClick={() => setNavOpen(!navOpen)}>
      <Link to={link}>{children}</Link>
    </li>
  );
};

export default NavLink;
