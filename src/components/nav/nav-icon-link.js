// IMPORTS ////////////////////////////////////////////////////////////////////

import React from 'react';
import { styled } from '../../../stitches.config';

// COMPONENTS /////////////////////////////////////////////////////////////////

const Link = styled('a', {});

const NavIconLink = ({ link, navOpen, setNavOpen, children }) => {
  return (
    <li onClick={() => setNavOpen(!navOpen)}>
      <Link href={link} target="_blank" rel="noreferrer">
        {children}
      </Link>
    </li>
  );
};

export default NavIconLink;
