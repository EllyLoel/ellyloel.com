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
    height: 100vh;
  }

  body {
    max-width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    position: relative;
  }

  #___gatsby {
    height: 100vh;
  }

  #gatsby-focus-wrapper {
    height: 100vh;
  }
`;

const Main = styled.main`
  min-height: 100%;
  display: grid;
  grid-template-columns: 100vw;
  grid-template-rows: auto 1fr auto;
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
