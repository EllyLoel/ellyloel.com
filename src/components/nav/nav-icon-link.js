// IMPORTS ////////////////////////////////////////////////////////////////////

import React from 'react';

// COMPONENTS /////////////////////////////////////////////////////////////////

const NavIconLink = ({ link, navOpen, setNavOpen, children }) => {
  return (
    <li onClick={() => setNavOpen(!navOpen)}>
      <a href={link} target="_blank" rel="noreferrer">
        {children}
      </a>
    </li>
  );
};

export default NavIconLink;
