// IMPORTS ////////////////////////////////////////////////////////////////////

import * as React from 'react';
import PropTypes from 'prop-types';
import 'normalize.css';
import styled, { createGlobalStyle } from 'styled-components';

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

const Main = styled.main`
  display: grid;
  grid-template-columns: 100vw;
  grid-template-areas:
    'landing'
    'projects'
    'about'
    'contact';
`;

// COMPONENTS /////////////////////////////////////////////////////////////////

const Layout = ({ children }) => (
  <>
    <Global />
    <Main>{children}</Main>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
