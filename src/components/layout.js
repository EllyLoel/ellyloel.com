// IMPORTS ////////////////////////////////////////////////////////////////////

import * as React from 'react';
import PropTypes from 'prop-types';
import 'normalize.css';
import styled, { createGlobalStyle } from 'styled-components';
import { motion } from 'framer-motion';

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

const Main = styled(motion.main)`
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

const Layout = ({ children, path }) => (
  <>
    <Global />
    <Main
      key={path}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        type: 'spring',
        mass: 0.35,
        stiffness: 75,
        duration: 0.3,
      }}
    >
      {children}
    </Main>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
