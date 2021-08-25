// IMPORTS ////////////////////////////////////////////////////////////////////

import React from 'react';

// COMPONENTS /////////////////////////////////////////////////////////////////

const NavIconLink = ({ link, children }) => {
  return (
    <li>
      <a href={link} target="_blank" rel="noreferrer">
        {children}
      </a>
    </li>
  );
};

export default NavIconLink;
