// IMPORTS ////////////////////////////////////////////////////////////////////

import * as React from 'react';
import PropTypes from 'prop-types';
import 'normalize.css';
import { createGlobalStyle } from 'styled-components';

import Footer from './footer';

// STYLES /////////////////////////////////////////////////////////////////////

const Global = createGlobalStyle`
  :root {
    --light: #FFF;
    --dark: #393939;
    --accent: #FFDC84;
    --bg-blue: #84ffdc;
    --bg-purple: #dc84ff;
  }

  * {
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif;
  }

  html {
    scroll-behavior: smooth;
    max-width: 100vw;
  }

  body {
    max-width: 100vw;
    overflow-x: hidden;
    position: relative;
  }
`;

// COMPONENTS /////////////////////////////////////////////////////////////////

const Layout = ({ children }) => (
  <>
    <Global />
    <main>{children}</main>
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
