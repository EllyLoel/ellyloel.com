// IMPORTS ////////////////////////////////////////////////////////////////////

import React from 'react';
import { Link } from 'gatsby';

// COMPONENTS /////////////////////////////////////////////////////////////////

const NavLink = ({ link, children }) => {
  return (
    <li>
      <Link to={link}>{children}</Link>
    </li>
  );
};

export default NavLink;
